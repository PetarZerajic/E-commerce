import * as Yup from "yup";

export const registerValidation = () => {
  const schema = Yup.object().shape({
    username: Yup.string()
      .required("Username is a required field")
      .min(4, "Username must be at least 4 characters"),
    email: Yup.string()
      .required("Email is a required field")
      .email("Invalid email format"),
    password: Yup.string()
      .required("Password is a required field")
      .min(8, "Password must be at least 8 characters"),
  });
  return { schema };
};
