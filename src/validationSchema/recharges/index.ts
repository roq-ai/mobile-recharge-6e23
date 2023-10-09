import * as yup from 'yup';

export const rechargeValidationSchema = yup.object().shape({
  amount: yup.number().integer().required(),
  recharge_date: yup.date().required(),
  recharge_status: yup.string().required(),
  recharge_type: yup.string().required(),
  transaction_id: yup.string().required(),
  user_id: yup.string().nullable().required(),
  provider_id: yup.string().nullable().required(),
});
