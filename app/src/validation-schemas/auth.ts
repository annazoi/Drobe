import * as yup from "yup";

export const SignInSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export const SignupSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  username: yup.string().required(),
  age: yup.number().optional(),
  avatar: yup.mixed().optional(),
});

export const EditUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  username: yup.string().required(),
  avatar: yup.mixed().optional(),
  age: yup.number().optional(),
  password: yup.string().optional(),
});
