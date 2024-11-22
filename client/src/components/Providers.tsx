import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import apiClient from "../api/apiClient.ts";
import { IntlProvider } from "react-intl";
import frTranslations from "../translations/fr.json";

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
    <IntlProvider locale={"fr"} messages={frTranslations}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </IntlProvider>
  );
};

export default Providers;
