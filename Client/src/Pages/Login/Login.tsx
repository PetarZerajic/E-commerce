import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setUserToken } from "../../Utils/Helper/LoginHelper";
import { toast } from "react-toastify";
import { Routes } from "../../Router/Routes";
import { LoginValidation } from "../../Utils/Helper/LoginValidation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import "./login.scss";

export const Login = () => {
  const initialUser = {
    identifier: "",
    password: "",
  };

  const [user, setUser] = useState(initialUser);
  const [passwordShown, setPasswordShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // add class on body login page when component is mounted
    document.body.classList.add("login-bg");

    // remove class on body login page when component is demounted
    return () => {
      document.body.classList.remove("login-bg");
    };
  }, []);
  const toggleViewPassword = () => {
    setPasswordShown(!passwordShown);
  };
  const { schema } = LoginValidation();

  return (
    <>
      <div className="login">
        <Formik
          initialValues={initialUser}
          onSubmit={async (values) => {
            const url = `${process.env.REACT_APP_URL}/auth/local`;

            try {
              if (values.identifier && values.password) {
                const response = await axios.post(url, values);
                const { data } = response;

                if (data.jwt) {
                  setUserToken(data);
                  toast.success("Logged in successfully!", {
                    hideProgressBar: false,
                  });
                  setUser(initialUser);
                  navigate(Routes.HOME);
                }
              }
            } catch (error: any) {
              toast.error(error.message, {
                hideProgressBar: false,
              });
            }
          }}
          validationSchema={schema}
        >
          {({ values, handleChange, handleSubmit, isValid, dirty }) => (
            <Form className="form" onSubmit={handleSubmit}>
              <h2>Login:</h2>
              <Field
                type="email"
                name="identifier"
                value={values.identifier}
                onChange={handleChange}
                placeholder="Enter a email"
              />

              <div className="error">
                <ErrorMessage name="identifier" />
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
                className={`login-button ${
                  !isValid || !dirty ? "disabled" : ""
                }`}
                disabled={!(isValid && dirty)}
              >
                Login
              </button>

              <small>
                <Link className="link" to={Routes.REGISTER}>
                  Don't have an account ? Register here.
                </Link>
              </small>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};
