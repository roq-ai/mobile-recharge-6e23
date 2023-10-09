import * as yup from 'yup';

export const cashbackValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  cashback_date: yup.date().required(),
  status: yup.string().required(),
  source: yup.string().required(),
  transaction_id: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
