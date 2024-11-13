import { useEffect, useState } from "react";
import Box from "../../components/Box";
import { ApiResponse, Client } from "../../lib/types";
import axios from "axios";

function Root() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
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

    fetchClients();
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <Box>
        <p className="text-2xl">Recherche d'une fiche de contact</p>
      </Box>
      <Box>
        <form className="w-96 mx-auto">
          <label htmlFor="search" className="my-2 font-bold">
            Renseigner un nom ou une dénomination
          </label>
          <div>
            <input
              type="text"
              id="search"
              placeholder="Nom ou dénomination"
              className="w-full border border-slate-100 my-2 px-2 py-1"
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
            {clients.map((client, index) => (
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
                  <button className="flex gap-1 px-3 py-1 text-sm text-white bg-blue-500 rounded-3xl hover:bg-blue-600">
                    <div className="w-5">
                      <img src="/svg/search.svg" alt="search" />
                    </div>
                    Voir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Root;
