import { Response } from "express";

export const sendPaginatedResponse = (
  res: Response,
  statusCode: number,
  message: string,
  data: unknown,
  total: number,
  page: number,
  limit: number
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
};