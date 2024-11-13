import { Client } from "../../lib/types";

/**
 * Composant de ligne de tableau pour afficher les informations d'un client
 * @param {Client} client - Les données du client
 * @param {(client: Client) => void} onViewClick - Fonction à appeler lors du clic sur le bouton "Voir"
 * @returns {JSX.Element}
 */
const ClientRow = ({ client, onViewClick }: { client: Client; onViewClick: (client: Client) => void }) => (
  <tr className="border-b bg-white hover:bg-gray-50">
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
        onClick={() => onViewClick(client)}
      >
        <div className="w-5">
          <img src="/svg/search.svg" alt="search" />
        </div>
        Voir
      </button>
    </td>
  </tr>
);

export default ClientRow;
