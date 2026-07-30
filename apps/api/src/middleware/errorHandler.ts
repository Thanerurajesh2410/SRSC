import { Request, Response, NextFunction } from "express";
import { Prisma } from "@prisma/client";
import { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";
import { AppError } from "../errors/AppError";
import { sendError } from "../utils/apiError";

export const errorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log error details (can later be replaced with Winston/Pino)
  console.error("========================================");
  console.error("❌ Error:", err);
  console.error("📍 Route:", req.originalUrl);
  console.error("📍 Method:", req.method);
  console.error("========================================");

  // ========================================
  // Custom Application Error
  // ========================================
  if (err instanceof AppError) {
    sendError(res, err.statusCode, err.message);
    return;
  }

  // ========================================
  // Prisma - Duplicate Record
  // ========================================
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2002"
  ) {
    sendError(res, 409, "Duplicate record already exists.");
    return;
  }

  // ========================================
  // Prisma - Record Not Found
  // ========================================
  if (
    err instanceof Prisma.PrismaClientKnownRequestError &&
    err.code === "P2025"
  ) {
    sendError(res, 404, "Requested record was not found.");
    return;
  }

  // ========================================
  // JWT Expired
  // ========================================
  if (err instanceof TokenExpiredError) {
    sendError(res, 401, "Token has expired.");
    return;
  }

  // ========================================
  // Invalid JWT
  // ========================================
  if (err instanceof JsonWebTokenError) {
    sendError(res, 401, "Invalid token.");
    return;
  }

  // ========================================
  // Validation Errors (Future Support)
  // ========================================
  if (err instanceof Error) {
    sendError(res, 500, err.message);
    return;
  }

  // ========================================
  // Unknown Error
  // ========================================
  sendError(res, 500, "Internal Server Error");
};