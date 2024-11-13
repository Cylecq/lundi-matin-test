import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import Box from "../../components/Box";
import { ApiResponse, Client } from "../../lib/types";
import Informations from "./Informations";
import Edit from "./Edit";

/**
 * Page de fiche de contact
 *
 * @returns {JSX.Element}
 */
function Info() {
  const location = useLocation();

  const [client, setClient] = useState<Client>();
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  /**
   * Fonction pour recuperer un client
   * @param {string} id - L'ID du client
   */
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="flex items-center gap-2 bg-secondary px-6 py-2 my-2 text-white rounded-md"
          >
            <div className="w-4">
              <img src="/svg/gear.svg" alt="edit" />
            </div>
            Editer
          </button>
        </div>
      </Box>
      {isEditMode ? <Edit client={client} setIsEditMode={setIsEditMode} /> : <Informations client={client} />}
    </div>
  );
}

export default Info;
