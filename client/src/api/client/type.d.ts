type EditClientPayload = {
  id: string;
  nom: string;
  tel: string;
  email: string;
  adresse: string;
  code_postal: string;
  ville: string;
};

type Client = {
  id: string;
  nom: string;
  email: string;
  tel: string;
  adresse: string;
  code_postal: string;
  ville: string;
  date_creation?: string;
};
