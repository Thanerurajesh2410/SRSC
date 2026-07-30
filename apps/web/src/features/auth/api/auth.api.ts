import api from "../../../services/api";

import type {
  LoginRequest,
  LoginResponse,
} from "../types";

export async function login(
  payload: LoginRequest
): Promise<LoginResponse> {
  const response = await api.post<LoginResponse>(
    "/auth/login",
    payload
  );

  return response.data;
}