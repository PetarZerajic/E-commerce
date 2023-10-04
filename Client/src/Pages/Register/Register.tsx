import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./register.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { Routes } from "../../Router/Routes";

const initialUser = {
  username: "",
  email: "",
  password: "",
};
export const Register = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("register-bg");
    return () => {
      document.body.classList.remove("register-bg");
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
  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault();

    const url = `${process.env.REACT_APP_URL}/auth/local/register`;
    try {
      if (user.username && user.email && user.password) {
        const response = await axios.post(url, user);

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
  };

  return (
    <>
      <div className="register">
        <form className="form">
          <h2>Sign up:</h2>
          <input
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
          <span>
            <button
              type="submit"
              className="register-button"
              onClick={handleRegister}
            >
              Sign up
            </button>
          </span>
        </form>
      </div>
    </>
  );
};
