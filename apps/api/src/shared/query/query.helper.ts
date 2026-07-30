import {
  DEFAULT_LIMIT,
  DEFAULT_ORDER,
  DEFAULT_PAGE,
  DEFAULT_SORT,
} from "./query.constants";

import { QueryDto } from "./query.dto";

export interface QueryOptions {
  page: number;
  limit: number;
  skip: number;
  take: number;
  search?: string;
  sortBy: string;
  order: "asc" | "desc";
}

export function buildQuery(query: QueryDto): QueryOptions {
  const page = Number(query.page) || DEFAULT_PAGE;
  const limit = Number(query.limit) || DEFAULT_LIMIT;

  return {
    page,
    limit,
    skip: (page - 1) * limit,
    take: limit,
    search: query.search,
    sortBy: query.sortBy || DEFAULT_SORT,
    order: query.order || DEFAULT_ORDER,
  };
}