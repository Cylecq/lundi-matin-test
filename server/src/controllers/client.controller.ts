import { Request, Response, NextFunction } from "express";
import { ApiService } from "../services/api.service";
import { ClientFilters, Client } from "../types/api.types";
import { ApiError } from "../middleware/error.middleware";

export class ClientController {
  constructor(private readonly apiService: ApiService) {}

  public async getClients(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const authToken = req.headers.authorization?.split(" ")[1];
      if (!authToken) {
        throw new ApiError(401, "Unauthorized");
      }

      const filters: ClientFilters = {
        nom: req.query.nom as string,
        ville: req.query.ville as string,
        sort: req.query.sort as string,
        fields: req.query.fields as string,
        limit: req.query.limit ? Number(req.query.limit) : undefined,
      };

      const response = await this.apiService.getClients(filters, authToken);
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  public async getClient(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const authToken = req.headers.authorization?.split(" ")[1];
      if (!authToken) {
        throw new ApiError(401, "Unauthorized");
      }

      const response = await this.apiService.getClient(
        req.params.id,
        authToken
      );
      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  public async updateClient(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const authToken = req.headers.authorization?.split(" ")[1];
      if (!authToken) {
        throw new ApiError(401, "Unauthorized");
      }

      const allowedFields: (keyof Client)[] = [
        "nom",
        "email",
        "tel",
        "adresse",
        "code_postal",
        "ville",
      ];
      const updateData: Partial<Client> = {};

      allowedFields.forEach((field) => {
        if (req.body[field] !== undefined) {
          updateData[field] = req.body[field];
        }
      });

      const response = await this.apiService.updateClient(
        req.params.id,
        updateData,
        authToken
      );
      res.json(response);
    } catch (error) {
      next(error);
    }
  }
}
