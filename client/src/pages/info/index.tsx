import Box from "../../components/Box";

function Info() {
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
          <h2 className="text-lg font-bold uppercase my-4">Informations</h2>
        </div>
        <div className="flex justify-center">
          <table className="my-4">
            <tr className="h-10">
              <td className="border-r border-slate-200 px-4 text-right font-bold">
                Prénom & NOM
              </td>
              <td className="px-4 text-left">Mathieu BOMPART</td>
            </tr>
            <tr className="h-10">
              <td className="border-r border-slate-200 px-4 text-right font-bold">
                Téléphone
              </td>
              <td className="px-4 text-left">01 23 45 67 89</td>
            </tr>
            <tr className="h-10">
              <td className="border-r border-slate-200 px-4 text-right font-bold">
                Email
              </td>
              <td className="px-4 text-left">mathieu@bompart.mb</td>
            </tr>
            <tr className="h-10">
              <td className="border-r border-slate-200 px-4 text-right font-bold">
                Adresse
              </td>
              <td className="px-4 text-left">
                836 rue du Mas de Verchant <br />
                34000 Montpellier
              </td>
            </tr>
          </table>
        </div>
      </Box>
    </div>
  );
}

export default Info;
