import * as yup from 'yup';

export const billPaymentValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  payment_date: yup.date().required(),
  payment_status: yup.string().required(),
  bill_type: yup.string().required(),
  transaction_id: yup.string().required(),
  user_id: yup.string().nullable().required(),
  provider_id: yup.string().nullable().required(),
});
