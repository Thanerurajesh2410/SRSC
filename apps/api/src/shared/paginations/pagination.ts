import { PaginationQuery } from "./pagination.dto";

export interface PaginationOptions {
  skip: number;
  take: number;
  page: number;
  limit: number;
  sortBy: string;
  order: "asc" | "desc";
}

export function getPagination(
  query: PaginationQuery
): PaginationOptions {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.max(Number(query.limit) || 10, 1);

  return {
    page,
    limit,
    skip: (page - 1) * limit,
    take: limit,
    sortBy: query.sortBy || "createdAt",
    order: query.order || "desc",
  };
}