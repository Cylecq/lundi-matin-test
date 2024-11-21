import { useForm } from "react-hook-form";
import Box from "../../components/Box";
import { useEditClient } from "../../api/client/hooks.ts";
import { useQueryClient } from "@tanstack/react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import { editClientSchema } from "../../lib/formSchema.ts";
import FormError from "../../components/FormError.tsx";

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

function Edit({ client, setIsEditMode }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<Inputs>({
    defaultValues: {
      nom: client.nom,
      tel: client.tel,
      email: client.email,
      adresse: client.adresse,
      code_postal: client.code_postal,
      ville: client.ville,
    },
    resolver: yupResolver(editClientSchema),
    mode: "onBlur",
  });
  console.log("AXEL errors", errors);
  const queryClient = useQueryClient();

  const onSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["get", "client", client.id] });
    setIsEditMode(false);
  };

  const { mutate, isPending } = useEditClient(onSuccess);

  const editClient = async (data: Inputs) => {
    mutate({
      id: client.id,
      ...data,
    });
  };

  return (
    <Box>
      {isPending ? (
        <p>Chargement...</p>
      ) : (
        <form onSubmit={handleSubmit(editClient)}>
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
                  <td className="px-4 flex items-center gap-2 flex text-left">
                    <input
                      type="text"
                      id="nom"
                      className="border border-slate-100 my-2 px-2 py-1"
                      {...register("nom")}
                    />
                    <FormError fieldError={errors.nom} />
                  </td>
                </tr>

                <tr className="h-10">
                  <td className="border-r border-slate-200 px-4 text-right font-bold">
                    <label htmlFor="tel">Téléphone</label>
                  </td>
                  <td className="px-4 flex items-center gap-2 text-left">
                    <input
                      type="tel"
                      id="tel"
                      className="border border-slate-100 my-2 px-2 py-1"
                      {...register("tel")}
                    />
                    <FormError fieldError={errors.tel} />
                  </td>
                </tr>

                <tr className="h-10">
                  <td className="border-r border-slate-200 px-4 text-right font-bold">
                    <label htmlFor="email">Email</label>
                  </td>
                  <td className="px-4 flex items-center gap-2 text-left">
                    <input
                      type="email"
                      className="border border-slate-100 my-2 px-2 py-1"
                      id="email"
                      {...register("email")}
                    />
                    <FormError fieldError={errors.email} />
                  </td>
                </tr>

                <tr className="h-10">
                  <td className="border-r border-slate-200 px-4 text-right font-bold">
                    <label htmlFor="adresse">Adresse</label>
                  </td>
                  <td className="px-4 flex items-center gap-2 text-left">
                    <input
                      type="text"
                      className="border border-slate-100 my-2 px-2 py-1"
                      id="adresse"
                      {...register("adresse")}
                    />
                    <FormError fieldError={errors.adresse} />
                  </td>
                </tr>

                <tr className="h-10">
                  <td className="border-r border-slate-200 px-4 text-right font-bold">
                    <label htmlFor="code_postal">Code postal</label>
                  </td>
                  <td className="px-4 flex items-center gap-2 text-left">
                    <input
                      type="number"
                      className="border border-slate-100 my-2 px-2 py-1"
                      id="code_postal"
                      {...register("code_postal")}
                    />
                    <FormError fieldError={errors.code_postal} />
                  </td>
                </tr>

                <tr className="h-10">
                  <td className="border-r border-slate-200 px-4 text-right font-bold">
                    <label htmlFor="ville">Ville</label>
                  </td>
                  <td className="px-4 flex items-center gap-2 text-left">
                    <input
                      type="text"
                      className="border border-slate-100 my-2 px-2 py-1"
                      id="ville"
                      {...register("ville")}
                    />
                    <FormError fieldError={errors.ville} />
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
              disabled={isPending || !isValid || isSubmitting}
            >
              Annuler
            </button>
            <button
              type="submit"
              className="bg-success px-6 py-2 my-2 text-white rounded-md hover:underline"
            >
              Enregistrer
            </button>
          </div>
        </form>
      )}
    </Box>
  );
}

export default Edit;
