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

import { createCustomerService } from 'apiSdk/customer-services';
import { customerServiceValidationSchema } from 'validationSchema/customer-services';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';
import { CustomerServiceInterface } from 'interfaces/customer-service';

function CustomerServiceCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CustomerServiceInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCustomerService(values);
      resetForm();
      router.push('/customer-services');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CustomerServiceInterface>({
    initialValues: {
      issue_type: '',
      issue_description: '',
      issue_status: '',
      user_id: (router.query.user_id as string) ?? null,
    },
    validationSchema: customerServiceValidationSchema,
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
              label: 'Customer Services',
              link: '/customer-services',
            },
            {
              label: 'Create Customer Service',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Customer Service
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.issue_type}
            label={'Issue Type'}
            props={{
              name: 'issue_type',
              placeholder: 'Issue Type',
              value: formik.values?.issue_type,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.issue_description}
            label={'Issue Description'}
            props={{
              name: 'issue_description',
              placeholder: 'Issue Description',
              value: formik.values?.issue_description,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.issue_status}
            label={'Issue Status'}
            props={{
              name: 'issue_status',
              placeholder: 'Issue Status',
              value: formik.values?.issue_status,
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
              onClick={() => router.push('/customer-services')}
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
    entity: 'customer_service',
    operation: AccessOperationEnum.CREATE,
  }),
)(CustomerServiceCreatePage);
