import * as yup from 'yup';

export const customerServiceValidationSchema = yup.object().shape({
  issue_type: yup.string().required(),
  issue_description: yup.string().required(),
  issue_status: yup.string().required(),
  user_id: yup.string().nullable().required(),
});
