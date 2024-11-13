import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ClientTable from "./ClientTable";
import Box from "../../components/Box";
import { ApiResponse, Client } from "../../lib/types";

interface Inputs {
  search: string;
}

const ClientSearch = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>();

  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchClients = async () => {
    const response = await axios.get<ApiResponse<Client[]>>(
      `${import.meta.env.VITE_SERVER_URL}/clients?fields=nom,ville,code_postal,adresse,tel`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setClients(response.data.datas);
  };

  const searchClients = async (search: string) => {
    const response = await axios.get<ApiResponse<Client[]>>(
      `${import.meta.env.VITE_SERVER_URL}/clients?fields=nom,ville,code_postal,adresse,tel&nom=${search}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    setClients(response.data.datas);
  };

  const onSubmit = async (data: Inputs) => {
    setLoading(true);
    try {
      await searchClients(data.search);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchClients()
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Box>
        <p className="text-2xl">Recherche d'une fiche de contact</p>
      </Box>
      <Box>
        <form onSubmit={handleSubmit(onSubmit)} className="w-96 mx-auto">
          <label htmlFor="search" className="my-2 font-bold">
            Renseigner un nom ou une dénomination
          </label>
          <div>
            <input
              type="text"
              id="search"
              placeholder="Nom ou dénomination"
              className="w-full border border-slate-100 my-2 px-2 py-1"
              {...register("search")}
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-secondary px-6 py-2 my-2 text-white rounded-md hover:underline">
              Rechercher
            </button>
          </div>
        </form>
      </Box>
      <ClientTable clients={clients} loading={loading} onViewClick={(client) => navigate(`/info/${client.id}`)} />
    </div>
  );
};

export default ClientSearch;
