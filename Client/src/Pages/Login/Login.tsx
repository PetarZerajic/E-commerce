import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { storeUser } from "../../Helper/LoginHelper";
import { toast } from "react-toastify";
import "./login.scss";

const initialUser = {
  password: "",
  identifier: "",
};
export const Login = () => {
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

  const handleLogin = async () => {
    const url = `http://localhost:1337/api/auth/local`;
    try {
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);
        if (data.jwt) {
          storeUser(data);
          toast.success("Logged in successfully!", {
            hideProgressBar: true,
          });
          setUser(initialUser);
          navigate("/");
          console.log(data);
        }
      }
    } catch (error: any) {
      toast.error(error.message, {
        hideProgressBar: true,
      });
    }
  };

  return (
    <div className="login">
      <h2>Login:</h2>
      <form className="form">
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
      </form>
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>

      <h6>
        Click <Link to="/registration"> Here</Link> to sign up
      </h6>
    </div>
  );
};
