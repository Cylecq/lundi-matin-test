import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import ClientTable from "./ClientTable";
import Box from "../../components/Box";
import { ApiResponse, Client } from "../../lib/types";
import { validateName } from "../../lib/validator";

interface Inputs {
  search: string;
}

/**
 * Page de recherche de fiche de contact
 *
 * @returns JSX.Element
 */
const ClientSearch = (): JSX.Element => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Inputs>();

  /**
   * Mise en place des hooks pour gerer les clients et le chargement
   */
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(false);

  /**
   * Renvoie la liste des clients
   */
  const fetchClients = async (): Promise<void> => {
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

  /**
   * Renvoie la liste des clients correspondant a la recherche
   * @param {string} search le nom ou la dénomination a rechercher
   */
  const searchClients = async (search: string): Promise<void> => {
    // Valide le nom ou la dénomination du client
    const isSearchValide = validateName(search);
    if (!isSearchValide) {
      alert("Nom ou denomination invalide");
      return;
    }

    // Requête GET
    const response = await axios.get<ApiResponse<Client[]>>(
      `${import.meta.env.VITE_SERVER_URL}/clients?fields=nom,ville,code_postal,adresse,tel&nom=${search}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // Mettre a jour la liste des clients
    setClients(response.data.datas);
  };

  /**
   * Gestion de la soumission du formulaire
   * @param {Inputs} data le formulaire a traiter
   */
  const onSubmit = async (data: Inputs): Promise<void> => {
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
