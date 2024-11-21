import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import apiClient from "../api/apiClient.ts";

type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient();

const Providers = ({ children }: Props) => {
  apiClient.interceptors.request.use((config) => {
    if (config.url === "login" || config.url === "register") {
      return config;
    }

    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    }

    return config;
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Providers;
