import axios, { AxiosInstance } from "axios";
import { config } from "../config/app.config";
import {
  AuthRequest,
  AuthResponse,
  Client,
  ApiResponse,
  ClientFilters,
} from "../types/api.types";

export class ApiService {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: config.api.baseUrl,
      headers: {
        Accept: config.api.version,
        "Content-Type": "application/json",
      },
    });
  }

  public async authenticate(credentials: AuthRequest): Promise<AuthResponse> {
    const response = await this.api.post<AuthResponse>("/auth", {
      ...credentials,
      code_application: "webservice_externe",
      code_version: config.api.defaultVersion,
    });

    return response.data;
  }

  public async getClients(
    filters: ClientFilters,
    authToken: string
  ): Promise<ApiResponse<Client[]>> {
    const params = new URLSearchParams();
    this.api.defaults.headers.common["Authorization"] = `Basic ${Buffer.from(
      `:${authToken}`
    ).toString("base64")}`;

    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined) {
        params.append(key, value.toString());
      }
      console.log("🚀 ~ ApiService ~ Object.entries ~ params:", params);
    });

    const response = await this.api.get<ApiResponse<Client[]>>(
      `/clients?${params.toString()}`
    );
    return response.data;
  }

  public async getClient(
    id: string,
    authToken: string
  ): Promise<ApiResponse<Client>> {
    this.api.defaults.headers.common["Authorization"] = `Basic ${Buffer.from(
      `:${authToken}`
    ).toString("base64")}`;
    const response = await this.api.get<ApiResponse<Client>>(`/clients/${id}`);
    return response.data;
  }

  public async updateClient(
    id: string,
    data: Partial<Client>,
    authToken: string
  ): Promise<ApiResponse<Client>> {
    this.api.defaults.headers.common["Authorization"] = `Basic ${Buffer.from(
      `:${authToken}`
    ).toString("base64")}`;
    const response = await this.api.put<ApiResponse<Client>>(
      `/clients/${id}`,
      data
    );
    return response.data;
  }
}
