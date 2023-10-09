import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createRecharge } from 'apiSdk/recharges';
import { rechargeValidationSchema } from 'validationSchema/recharges';
import { UserInterface } from 'interfaces/user';
import { ProviderInterface } from 'interfaces/provider';
import { getUsers } from 'apiSdk/users';
import { getProviders } from 'apiSdk/providers';
import { RechargeInterface } from 'interfaces/recharge';

function RechargeCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: RechargeInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createRecharge(values);
      resetForm();
      router.push('/recharges');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<RechargeInterface>({
    initialValues: {
      amount: 0,
      recharge_date: new Date(new Date().toDateString()),
      recharge_status: '',
      recharge_type: '',
      transaction_id: '',
      user_id: (router.query.user_id as string) ?? null,
      provider_id: (router.query.provider_id as string) ?? null,
    },
    validationSchema: rechargeValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Recharges',
              link: '/recharges',
            },
            {
              label: 'Create Recharge',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Recharge
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <NumberInput
            label="Amount"
            formControlProps={{
              id: 'amount',
              isInvalid: !!formik.errors?.amount,
            }}
            name="amount"
            error={formik.errors?.amount}
            value={formik.values?.amount}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('amount', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="recharge_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Recharge Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.recharge_date ? new Date(formik.values?.recharge_date) : null}
              onChange={(value: Date) => formik.setFieldValue('recharge_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.recharge_status}
            label={'Recharge Status'}
            props={{
              name: 'recharge_status',
              placeholder: 'Recharge Status',
              value: formik.values?.recharge_status,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.recharge_type}
            label={'Recharge Type'}
            props={{
              name: 'recharge_type',
              placeholder: 'Recharge Type',
              value: formik.values?.recharge_type,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.transaction_id}
            label={'Transaction Id'}
            props={{
              name: 'transaction_id',
              placeholder: 'Transaction Id',
              value: formik.values?.transaction_id,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <AsyncSelect<ProviderInterface>
            formik={formik}
            name={'provider_id'}
            label={'Select Provider'}
            placeholder={'Select Provider'}
            fetcher={getProviders}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/recharges')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'recharge',
    operation: AccessOperationEnum.CREATE,
  }),
)(RechargeCreatePage);
