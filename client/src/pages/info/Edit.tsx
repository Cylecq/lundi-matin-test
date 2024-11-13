import { SubmitHandler, useForm } from "react-hook-form";
import Box from "../../components/Box";
import { ApiResponse, Client } from "../../lib/types";
import axios from "axios";
import { useState } from "react";

interface Props {
  client: Client;
  setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Inputs {
  nom: string;
  tel: string;
  email: string;
  adresse: string;
  code_postal: string;
  ville: string;
}

/**
 * Composant pour editer un client
 * @param {Client} client - Les informations du client
 * @param {React.Dispatch<React.SetStateAction<boolean>>} setIsEditMode - La fonction a appeler pour sortir du mode edition
 * @returns {JSX.Element}
 */
function Edit({ client, setIsEditMode }: Props) {
  const { register, handleSubmit } = useForm<Inputs>({
    defaultValues: {
      nom: client.nom,
      tel: client.tel,
      email: client.email,
      adresse: client.adresse,
      code_postal: client.code_postal,
      ville: client.ville,
    },
  });

  const [loading, setLoading] = useState(false);

  /**
   * Fonction pour mettre a jour un client en base
   * @param {string} name - Le nouveau nom du client
   * @param {string} phone - Le nouveau numero de telephone du client
   * @param {string} email - Le nouvel email du client
   * @param {string} address - La nouvelle adresse du client
   * @param {string} postalCode - Le nouveau code postal du client
   * @param {string} city - La nouvelle ville du client
   */
  const editClient = async (
    name: string,
    phone: string,
    email: string,
    address: string,
    postalCode: string,
    city: string
  ) => {
    await axios.put<ApiResponse<void>>(
      `${import.meta.env.VITE_SERVER_URL}/clients/${client.id}`,
      {
        nom: name,
        tel: phone,
        email: email,
        adresse: address,
        code_postal: postalCode,
        ville: city,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
  };

  /**
   * Fonction a appeler lors de la soumission du formulaire
   * @param {Inputs} data - Les donnees du formulaire
   */
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { nom, tel, email, adresse, code_postal, ville } = data;
    try {
      setLoading(true);
      await editClient(nom, tel, email, adresse, code_postal, ville);
      window.location.reload();
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border-b border-slate-200">
            <h2 className="text-lg font-bold uppercase my-4">Edition</h2>
          </div>
          <div className="flex justify-center border-b border-slate-200">
            <table className="my-4">
              <tbody>
                <tr className="h-10">
                  <td className="border-r border-slate-200 px-4 text-right font-bold">
                    <label htmlFor="nom">Prénom & NOM</label>
                  </td>
                  <td className="px-4 text-left">
                    <input
                      type="text"
                      id="nom"
                      className="border border-slate-100 my-2 px-2 py-1"
                      {...register("nom")}
                    />
                  </td>
                </tr>
                <tr className="h-10">
                  <td className="border-r border-slate-200 px-4 text-right font-bold">
                    <label htmlFor="tel">Téléphone</label>
                  </td>
                  <td className="px-4 text-left">
                    <input
                      type="tel"
                      id="tel"
                      className="border border-slate-100 my-2 px-2 py-1"
                      {...register("tel")}
                    />
                  </td>
                </tr>
                <tr className="h-10">
                  <td className="border-r border-slate-200 px-4 text-right font-bold">
                    <label htmlFor="email">Email</label>
                  </td>
                  <td className="px-4 text-left">
                    <input
                      type="email"
                      className="border border-slate-100 my-2 px-2 py-1"
                      id="email"
                      {...register("email")}
                    />
                  </td>
                </tr>
                <tr className="h-10">
                  <td className="border-r border-slate-200 px-4 text-right font-bold">
                    <label htmlFor="adresse">Adresse</label>
                  </td>
                  <td className="px-4 text-left">
                    <input
                      type="text"
                      className="border border-slate-100 my-2 px-2 py-1"
                      id="adresse"
                      {...register("adresse")}
                    />
                  </td>
                </tr>
                <tr className="h-10">
                  <td className="border-r border-slate-200 px-4 text-right font-bold">
                    <label htmlFor="code_postal">Code postal</label>
                  </td>
                  <td className="px-4 text-left">
                    <input
                      type="number"
                      className="border border-slate-100 my-2 px-2 py-1"
                      id="code_postal"
                      {...register("code_postal")}
                    />
                  </td>
                </tr>
                <tr className="h-10">
                  <td className="border-r border-slate-200 px-4 text-right font-bold">
                    <label htmlFor="ville">Ville</label>
                  </td>
                  <td className="px-4 text-left">
                    <input
                      type="text"
                      className="border border-slate-100 my-2 px-2 py-1"
                      id="ville"
                      {...register("ville")}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-1">
            <button
              type="button"
              onClick={() => setIsEditMode(false)}
              className="bg-white border border-slate-400 px-6 py-2 my-2 text-slate-400 rounded-md hover:underline"
            >
              Annuler
            </button>
            <button type="submit" className="bg-success px-6 py-2 my-2 text-white rounded-md hover:underline">
              Enregistrer
            </button>
          </div>
        </form>
      )}
    </Box>
  );
}

export default Edit;
