import { Client } from "../../lib/types";
import Box from "../../components/Box";

type Props = {
  client: Client;
};

/**
 * Composant affichant les informations d'un client
 *
 * @param {Client} client - Les informations du client

 * @returns {JSX.Element} Le composant
 */
function Informations({ client }: Props) {
  return (
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
  );
}

export default Informations;
