import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storeUser } from "../../Helper/LoginHelper";
import { toast } from "react-toastify";
import "./login.scss";
import { Routes } from "../../Router/Routes";

export const Login = () => {
  const initialUser = {
    identifier: "",
    password: "",
  };

  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  useEffect(() => {
    // add class on body login page when component is mounted
    document.body.classList.add("login-bg");

    // remove class on body login page when component is demounted
    return () => {
      document.body.classList.remove("login-bg");
    };
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    const url = `${process.env.REACT_APP_URL}/auth/local`;

    try {
      if (user.identifier && user.password) {
        const response = await axios.post(url, user);
        const { data } = response;

        if (data.jwt) {
          storeUser(data);
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
  };

  return (
    <>
      <div className="login">
        <form className="form">
          <h2>Login:</h2>
          <input
            type="email"
            name="identifier"
            value={user.identifier}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          <span>
            <button
              type="submit"
              className="login-button"
              onClick={handleLogin}
            >
              Login
            </button>
          </span>

          <small>
            <Link className="link" to={Routes.REGISTER}>
              Don't have an account ? Register here.
            </Link>
          </small>
        </form>
      </div>
    </>
  );
};
