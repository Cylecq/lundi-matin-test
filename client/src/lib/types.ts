export interface Client {
  id: string;
  nom: string;
  email: string;
  tel: string;
  adresse: string;
  code_postal: string;
  ville: string;
  date_creation?: string;
}

export interface AuthResponse {
  code: number;
  message: string;
  datas: {
    token: string;
  };
  warnings: string[];
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  datas: T;
  warnings: string[];
}
