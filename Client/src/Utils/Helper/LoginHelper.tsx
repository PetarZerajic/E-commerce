import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserLoginProps } from "../../Interfaces/user";
import { Routes } from "../../Router/Routes";

interface IProps {
  Component: React.ComponentType<any>;
}

export const setUserToken = (data: UserLoginProps | null) => {
  if (data) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        createdAt: new Date().toLocaleDateString("sr-RS"),
        jwt: data.jwt,
      })
    );
  }
};

export const userData = () => {
  const stringifiedUser = localStorage.getItem("user") || "{}";
  return JSON.parse(stringifiedUser);
};

export const Protector = ({ Component }: IProps) => {
  const navigate = useNavigate();

  const { jwt } = userData();
  useEffect(() => {
    if (!jwt) {
      navigate(Routes.LOGIN);
    }
  }, [navigate, jwt]);

  return <Component />;
};
