import * as yup from 'yup';
import { VALIDATE_PATTERNS } from '../../shared/patterns/validatePatterns';

export const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required('First Name is required')
    .max(50, 'Max length is 50 characters'),
  lastName: yup.string(),
  email: yup
    .string()
    .required('Email is required')
    .email('Invalid email format'),
  phone: yup
    .string()
    .required('Phone is required')
    .matches(VALIDATE_PATTERNS.PHONE_NUMBER, "Phone number isn't valid"),
  contactCategory: yup.string().required('Contact category is required'),
  projects: yup.array().of(
    yup.object().shape({
      name: yup.string().required('Project Name is required'),
      tasks: yup.array().of(
        yup.object().shape({
          name: yup.string().required('Task Name is required'),
          status: yup.string().required('Task Status is required'),
        })
      ),
    })
  ),
});
