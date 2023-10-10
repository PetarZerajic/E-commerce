import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Routes } from "../../Router/Routes";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { registerValidation } from "../../Utils/Helper/RegisterValidation";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./register.scss";
import { Spinner } from "../../Components/Spinner/Spinner";

const initialUser = {
  username: "",
  email: "",
  password: "",
};
export const Register = () => {
  const [user, setUser] = useState(initialUser);
  const [loading, setIsLoading] = useState(false);
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
            setIsLoading(true);

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
              setTimeout(() => {
                setIsLoading(false);
              }, 6000);
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
              <div className="password-container">
                <Field
                  type={passwordShown ? "text" : "password"}
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  placeholder="Enter a password"
                />
                <button
                  type="button"
                  className="visibility"
                  onClick={toggleViewPassword}
                >
                  {passwordShown ? <VisibilityIcon /> : <VisibilityOffIcon />}
                </button>
              </div>

              <div className="error">
                <ErrorMessage name="password" />
              </div>
              <button
                className={loading ? "loading" : "register-button"}
                disabled={loading === true}
              >
                {loading ? <Spinner /> : "Sign Up"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
