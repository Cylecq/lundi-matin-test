import { Client } from "../../lib/types";
import ClientRow from "./ClientRow";

/**
 * Affiche une table de clients
 * @param {Client[]} clients - Liste des clients a afficher
 * @param {boolean} loading - Si la liste est en cours de chargement
 * @param {(client: Client) => void} onViewClick - Fonction a appeler lorsque l'utilisateur clique sur "Voir"
 * @returns {JSX.Element}
 */
const ClientTable = ({
  clients,
  loading,
  onViewClick,
}: {
  clients: Client[];
  loading: boolean;
  onViewClick: (client: Client) => void;
}) => (
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
          clients.map((client, index) => <ClientRow key={index} client={client} onViewClick={onViewClick} />)
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
);

export default ClientTable;
