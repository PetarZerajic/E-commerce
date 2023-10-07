import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Routes } from "../../Router/Routes";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerValidation } from "../../Utils/Helper/RegisterValidation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import "./register.scss";

const initialUser = {
  username: "",
  email: "",
  password: "",
};
export const Register = () => {
  const [user, setUser] = useState(initialUser);
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("register-bg");
    return () => {
      document.body.classList.remove("register-bg");
    };
  }, []);

  const toggleViewPassword = () => {
    setPasswordShown(!passwordShown);
  };

  const { schema } = registerValidation();
  return (
    <>
      <div className="register">
        <Formik
          initialValues={initialUser}
          validationSchema={schema}
          onSubmit={async (values) => {
            const url = `${process.env.REACT_APP_URL}/auth/local/register`;
            try {
              if (values.username && values.email && values.password) {
                const response = await axios.post(url, values);

                if (response) {
                  toast.success("Registered successfully!", {
                    hideProgressBar: false,
                  });
                  setUser(initialUser);
                  navigate(Routes.LOGIN);
                }
              }
            } catch (error: any) {
              toast.error(error.message, {
                hideProgressBar: false,
              });
            }
          }}
        >
          {({ values, isValid, dirty, handleChange, handleSubmit }) => (
            <Form className="form" onSubmit={handleSubmit}>
              <h2>Sign up:</h2>
              <Field
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                placeholder="Enter your full name"
              />
              <div className="error">
                <ErrorMessage name="username" />
              </div>
              <Field
                type="email"
                name="email"
                value={values.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              <div className="error">
                <ErrorMessage name="email" />
              </div>

              <Field
                type={passwordShown ? "text" : "password"}
                name="password"
                value={values.password}
                onChange={handleChange}
                placeholder="Enter a password"
              />

              <div className="error">
                <ErrorMessage name="password" />
              </div>
              <button
                type="button"
                className="visibility"
                onClick={toggleViewPassword}
              >
                <VisibilityIcon />
              </button>
              <button
                type="submit"
                className={`register-button ${
                  !isValid || !dirty ? "disabled" : ""
                }`}
                disabled={!isValid && !dirty}
              >
                Sign up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
