import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "../../components/Box";
import Informations from "./Informations";
import Edit from "./Edit";
import { useClient } from "../../api/client/hooks";

function Info() {
  const location = useLocation();

  const [isEditMode, setIsEditMode] = useState(false);

  const clientId = useMemo(
    () => location.pathname.split("/")[2],
    [location.pathname],
  );

  const { data: client, isLoading: loading } = useClient(clientId);

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
          <h1 className="text-2xl">{client.datas.nom}</h1>
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
      {isEditMode ? (
        <Edit client={client.datas} setIsEditMode={setIsEditMode} />
      ) : (
        <Informations client={client.datas} />
      )}
    </div>
  );
}

export default Info;
