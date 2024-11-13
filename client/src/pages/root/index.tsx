import { useEffect, useState } from "react";
import Box from "../../components/Box";
import { ApiResponse, Client } from "../../lib/types";
import axios from "axios";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface Inputs {
  search: string;
}

function Root() {
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

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { search } = data;
    setLoading(true);
    try {
      await searchClients(search);
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
      <div className="w-full">
        <table className="w-full border border-slate-200">
          <thead>
            <tr className="border-b bg-slate-200">
              <th className="px-4 py-2"></th>

              <th className="text-left px-4 py-2">Nom</th>
              <th className="text-left px-4 py-2">Adresse</th>
              <th className="text-left px-4 py-2">Ville</th>
              <th className="text-left px-4 py-2">Téléphone</th>
              <th className="px-4 py-2"></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="text-center py-4">
                  Chargement...
                </td>
              </tr>
            ) : clients.length > 0 ? (
              clients.map((client, index) => (
                <tr key={index} className="border-b bg-white hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm text-gray-600">
                        {client.nom
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .toLocaleUpperCase()}
                      </span>
                    </div>
                  </td>
                  <td>
                    <span className="font-bold">{client.nom}</span>
                  </td>
                  <td className="px-4 py-3">{client.adresse}</td>
                  <td className="px-4 py-3">{client.ville}</td>
                  <td className="px-4 py-3">{client.tel}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      className="flex gap-1 px-3 py-1 text-sm text-white bg-blue-500 rounded-3xl hover:bg-blue-600"
                      onClick={() => navigate(`/info/${client.id}`)}
                    >
                      <div className="w-5">
                        <img src="/svg/search.svg" alt="search" />
                      </div>
                      Voir
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center">
                  Aucun contact trouvé
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Root;
