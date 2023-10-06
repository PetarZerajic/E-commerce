import { useEffect } from "react";

export const useShakeEffect = () => {
  useEffect(() => {
    const hasToken = localStorage.getItem("user");

    if (!hasToken) {
      const loginComponent = document.querySelector(".login");

      if (loginComponent) {
        loginComponent.classList.add("shake");
      }
    }
  }, []);
};
