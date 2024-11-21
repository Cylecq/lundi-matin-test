import apiClient from "../apiClient.ts";

export const getCLients = async (searchedName?: string) => {
  console.log("AXEL", searchedName);
  const response = await apiClient.get<ApiResponse<Client[]>>(
    `clients?fields=nom,ville,code_postal,adresse,tel&nom=${searchedName}`,
  );
  return response.data;
};

export const getClient = async (id: string) => {
  const response = await apiClient.get<ApiResponse<Client>>(`clients/${id}`);
  return response.data;
};

export const editClient = async (payload: EditClientPayload) => {
  console.log("AXEL payload", payload);
  const response = await apiClient.put(`clients/${payload.id}`, payload);
  return response.data;
};
