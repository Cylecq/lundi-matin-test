import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import ClientTable from "./ClientTable";
import Box from "../../components/Box";
import { useClients } from "../../api/client/hooks.ts";
import { yupResolver } from "@hookform/resolvers/yup";
import { searchSchema } from "../../lib/formSchema.ts";
import FormError from "../../components/FormError.tsx";

interface Inputs {
  search?: string;
}

const ClientSearch = (): JSX.Element => {
  const navigate = useNavigate();
  const [searchedName, setSearchedName] = useState("");
  const { data: clients, isLoading: loading } = useClients(searchedName);

  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(searchSchema),
    mode: "onSubmit",
  });

  const onSubmit = async (data: Inputs): Promise<void> => {
    setSearchedName(data.search || "");
  };

  return (
    <div className="flex flex-col gap-4">
      <Box>
        <p className="text-2xl">Recherche d'une fiche de contact</p>
      </Box>

      <Box>
        <form onSubmit={handleSubmit(onSubmit)} className="w-96 mx-auto">
          <label htmlFor="search" className="my-2 font-bold">
            Renseigner un nom ou une dénomination
          </label>
          <div>
            <input
              type="text"
              id="search"
              placeholder="Nom ou dénomination"
              className="w-full border border-slate-100 my-2 px-2 py-1"
              {...register("search")}
            />
            <FormError fieldError={errors.search} />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-secondary px-6 py-2 my-2 text-white rounded-md hover:underline"
              disabled={!isValid || isSubmitting}
            >
              Rechercher
            </button>
          </div>
        </form>
      </Box>

      {!!clients?.datas && (
        <ClientTable
          clients={clients.datas}
          loading={loading}
          onViewClick={(client) => navigate(`/info/${client.id}`)}
        />
      )}
    </div>
  );
};

export default ClientSearch;
