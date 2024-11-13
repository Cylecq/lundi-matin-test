import Box from "../../components/Box";

const contacts = [
  {
    initials: "PM",
    name: "Paul MICHEL",
    address: "",
    city: "",
    phone: "",
  },
  {
    initials: "MB",
    name: "Mathieu BOMPART",
    address: "836 rue du Mas de Verchant",
    city: "34000 - MONTPELLIER",
    phone: "01 23 45 67 89",
  },
  {
    initials: "CP",
    name: "Céline PERIK",
    address: "836 rue du Mas de Verchant",
    city: "34000 - MONTPELLIER",
    phone: "09 87 65 43 21",
  },
  {
    initials: "JB",
    name: "Jean-Yve BAUDIN",
    address: "",
    city: "",
    phone: "",
  },
  {
    initials: "DR",
    name: "Dominguez ROGER",
    address: "836 rue du Mas de Verchant",
    city: "34000 - MONTPELLIER",
    phone: "02 34 56 78 90",
  },
];

function Root() {
  return (
    <div className="flex flex-col gap-4">
      <Box>
        <p className="text-2xl">Recherche d'une fiche de contact</p>
      </Box>
      <Box>
        <form className="w-96 mx-auto">
          <label htmlFor="search" className="my-2 font-bold">
            Renseigner un nom ou une dénomination
          </label>
          <div>
            <input
              type="text"
              id="search"
              placeholder="Nom ou dénomination"
              className="w-full border border-slate-100 my-2 px-2 py-1"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-secondary px-6 py-2 my-2 text-white rounded-md hover:underline"
            >
              Rechercher
            </button>
          </div>
        </form>
      </Box>
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
            {contacts.map((contact, index) => (
              <tr key={index} className="border-b bg-white hover:bg-gray-50">
                <td className="px-4 py-3 flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm text-gray-600">
                      {contact.initials}
                    </span>
                  </div>
                </td>
                <td>
                  <span className="font-bold">{contact.name}</span>
                </td>
                <td className="px-4 py-3">{contact.address}</td>
                <td className="px-4 py-3">{contact.city}</td>
                <td className="px-4 py-3">{contact.phone}</td>
                <td className="px-4 py-3 text-right">
                  <button className="flex gap-1 px-3 py-1 text-sm text-white bg-blue-500 rounded-3xl hover:bg-blue-600">
                    <div className="w-5">
                      <img src="/svg/search.svg" alt="search" />
                    </div>
                    Voir
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Root;
