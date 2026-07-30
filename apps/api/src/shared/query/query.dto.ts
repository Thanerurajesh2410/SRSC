export interface QueryDto {
  page?: number;
  limit?: number;

  search?: string;

  sortBy?: string;
  order?: "asc" | "desc";

  isActive?: boolean;

  designation?: string;
}