import * as Yup from "yup";

export const LoginValidation = () => {
  const schema = Yup.object().shape({
    identifier: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
  });
  return { schema };
};
