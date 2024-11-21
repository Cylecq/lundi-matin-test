import apiClient from "../apiClient.ts";

export const login = async (payload: LoginPayload) => {
  const response = await apiClient.post<ApiResponse<LoginResponse>>(
    `${import.meta.env.VITE_SERVER_URL}/auth`,
    payload,
  );

  return response.data;
};
