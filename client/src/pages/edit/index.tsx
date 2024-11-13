import Box from "../../components/Box";

function Edit() {
  return (
    <div className="flex flex-col gap-4">
      <Box>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl">Mathieu BOMPART</h1>
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
          <h2 className="text-lg font-bold uppercase my-4">Edition</h2>
        </div>
        <div className="flex justify-center border-b border-slate-200">
          <table className="my-4">
            <tr className="h-10">
              <td className="border-r border-slate-200 px-4 text-right font-bold">
                <label htmlFor="name">Prénom & NOM</label>
              </td>
              <td className="px-4 text-left">
                <input
                  type="text"
                  id="name"
                  className="border border-slate-100 my-2 px-2 py-1"
                />
              </td>
            </tr>
            <tr className="h-10">
              <td className="border-r border-slate-200 px-4 text-right font-bold">
                <label htmlFor="phone">Téléphone</label>
              </td>
              <td className="px-4 text-left">
                <input
                  type="tel"
                  id="phone"
                  className="border border-slate-100 my-2 px-2 py-1"
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
                  name="email"
                  className="border border-slate-100 my-2 px-2 py-1"
                  id="email"
                />
              </td>
            </tr>
            <tr className="h-10">
              <td className="border-r border-slate-200 px-4 text-right font-bold">
                <label htmlFor="address">Adresse</label>
              </td>
              <td className="px-4 text-left">
                <input
                  type="tel"
                  name="address"
                  className="border border-slate-100 my-2 px-2 py-1"
                  id="address"
                />
              </td>
            </tr>
            <tr className="h-10">
              <td className="border-r border-slate-200 px-4 text-right font-bold">
                <label htmlFor="zip-code">Code postal</label>
              </td>
              <td className="px-4 text-left">
                <input
                  type="number"
                  name="zip-code"
                  className="border border-slate-100 my-2 px-2 py-1"
                  id="zip-code"
                />
              </td>
            </tr>
            <tr className="h-10">
              <td className="border-r border-slate-200 px-4 text-right font-bold">
                <label htmlFor="city">Ville</label>
              </td>
              <td className="px-4 text-left">
                <input
                  type="text"
                  name="city"
                  className="border border-slate-100 my-2 px-2 py-1"
                  id="city"
                />
              </td>
            </tr>
          </table>
        </div>
        <div className="flex justify-end gap-1">
          <button className="bg-white border border-slate-400 px-6 py-2 my-2 text-slate-400 rounded-md hover:underline">
            Annuler
          </button>
          <button className="bg-success px-6 py-2 my-2 text-white rounded-md hover:underline">
            Enregistrer
          </button>
        </div>
      </Box>
    </div>
  );
}

export default Edit;
