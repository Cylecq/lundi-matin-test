import { Request, Response, NextFunction } from "express";
import axios, { AxiosError } from "axios";

export class ApiError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public warnings: string[] = []
  ) {
    super(message);
  }
}

export const errorHandler = (
  error: Error | AxiosError | ApiError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error("Error:", error);

  if (error instanceof ApiError) {
    res.status(error.statusCode).json({
      code: error.statusCode,
      message: error.message,
      datas: null,
      warnings: error.warnings,
    });
    return;
  }

  if (axios.isAxiosError(error)) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || "API Error";
    const warnings = error.response?.data?.warnings || [];

    res.status(status).json({
      code: status,
      message,
      datas: null,
      warnings,
    });
    return;
  }

  res.status(500).json({
    code: 500,
    message: "Internal Server Error",
    datas: null,
    warnings: [],
  });
};
