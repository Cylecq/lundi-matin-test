import ClientRow from "./ClientRow";

type Props = {
  clients: Client[];
  loading: boolean;
  onViewClick: (client: Client) => void;
};

const ClientTable = ({ clients, loading, onViewClick }: Props) => (
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
            <ClientRow key={index} client={client} onViewClick={onViewClick} />
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
);

export default ClientTable;
