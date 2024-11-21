import { useMutation } from "@tanstack/react-query";
import { login } from "./user.ts";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: login,
    onSuccess: (response) => {
      localStorage.setItem("token", response.datas.token);
      navigate("/");
    },
  });
};
