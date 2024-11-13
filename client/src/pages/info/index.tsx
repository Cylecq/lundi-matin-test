import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Box from "../../components/Box";
import { ApiResponse, Client } from "../../lib/types";

function Info() {
  const location = useLocation();

  const [client, setClient] = useState<Client>();
  const [loading, setLoading] = useState(false);

  const fetchClient = async (id: string) => {
    const response = await axios.get<ApiResponse<Client>>(`${import.meta.env.VITE_SERVER_URL}/clients/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    setClient(response.data.datas);
  };

  useEffect(() => {
    const id = location.pathname.split("/")[2];

    setLoading(true);
    fetchClient(id)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <Box>
        <p>Chargement...</p>
      </Box>
    );
  }

  if (!client) {
    return (
      <Box>
        <p>Aucun client trouvé</p>
      </Box>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Box>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">{client.nom}</h1>
          <button className="flex items-center gap-2 bg-secondary px-6 py-2 my-2 text-white rounded-md">
            <div className="w-4">
              <img src="/svg/gear.svg" alt="edit" />
            </div>
            Editer
          </button>
        </div>
      </Box>
      <Box>
        <div className="border-b border-slate-200">
          <h2 className="text-lg font-bold uppercase my-4">Informations</h2>
        </div>
        <div className="flex justify-center">
          <table className="my-4">
            <tbody>
              <tr className="h-10">
                <td className="border-r border-slate-200 px-4 text-right font-bold">Prénom & NOM</td>
                <td className="px-4 text-left">{client.nom}</td>
              </tr>
              <tr className="h-10">
                <td className="border-r border-slate-200 px-4 text-right font-bold">Téléphone</td>
                <td className="px-4 text-left">{client.tel}</td>
              </tr>
              <tr className="h-10">
                <td className="border-r border-slate-200 px-4 text-right font-bold">Email</td>
                <td className="px-4 text-left">{client.email}</td>
              </tr>
              <tr className="h-10">
                <td className="border-r border-slate-200 px-4 text-right font-bold">Adresse</td>
                <td className="px-4 text-left">
                  {client.adresse} <br />
                  {client.code_postal} {client.ville}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Box>
    </div>
  );
}

export default Info;
