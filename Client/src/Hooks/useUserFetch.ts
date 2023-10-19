import { useEffect, useState } from "react";
import { UserProps } from "../Interfaces/user";
import { userData } from "../Utils/Helper/LoginHelper";
import axios from "axios";

export const useUserFetch = () => {
  const [user, setUser] = useState<UserProps>();
  const [users, setUsers] = useState<UserProps[]>([]);
  const [isUserUpdated, setIsUserUpdated] = useState(false);
  const { jwt } = userData();

  useEffect(() => {
    const getProfileDate = async () => {
      const url = `${process.env.REACT_APP_URL}/users/me`;
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        });
        setUser(response.data);
        setIsUserUpdated(false);
      } catch (error) {
        console.log(error);
      }
    };
    getProfileDate();
  }, [jwt, isUserUpdated]);

  useEffect(() => {
    const getAllUsers = async () => {
      const url = `${process.env.REACT_APP_URL}/users`;
      try {
        const response = await axios.get(url);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllUsers();
  }, []);

  return { user, users, setIsUserUpdated };
};
