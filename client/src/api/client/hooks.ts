import { editClient, getClient, getCLients } from "./client.ts";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useClients = (searchedName?: string) => {
  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["get", "clients", searchedName],
    queryFn: () => getCLients(searchedName),
  });

  return { data, error, isLoading, refetch };
};

export const useClient = (clientId: string) => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["get", "client", clientId],
    queryFn: () => getClient(clientId),
  });

  return { data, error, isLoading };
};

export const useEditClient = (onSuccess?: () => void) => {
  return useMutation({
    mutationFn: editClient,
    onSuccess,
  });
};
