export interface AuthRequest {
  username: string;
  password: string;
  password_type?: 0 | 10;
  code_application: "webservice_externe";
  code_version: string;
}

export interface AuthResponse {
  code: number;
  message: string;
  datas: {
    token: string;
  };
  warnings: string[];
}

export interface Client {
  id: string;
  nom?: string;
  date_creation?: string;
  email?: string;
  tel?: string;
  adresse?: string;
  code_postal?: string;
  ville?: string;
}

export interface ApiResponse<T> {
  code: number;
  message: string;
  datas: T;
  warnings: string[];
}

export interface ClientFilters {
  nom?: string;
  ville?: string;
  sort?: string;
  fields?: string;
  limit?: number;
}
