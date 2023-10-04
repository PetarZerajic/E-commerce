import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserProps } from "../Interfaces/user";

interface IProps {
  Component: React.ComponentType<any>;
}

export const storeUser = (data: UserProps) => {
  localStorage.setItem(
    "user",
    JSON.stringify({
      username: data.user.username,
      jwt: data.jwt,
    })
  );
};

const userData = () => {
  const stringifiedUser = localStorage.getItem("user") || "{}";
  return JSON.parse(stringifiedUser);
};

export const Protector = ({ Component }: IProps) => {
  const navigate = useNavigate();

  const { jwt } = userData();

  useEffect(() => {
    if (!jwt) {
      navigate("/login");
    }
  }, [navigate, jwt]);

  return <Component />;
};
