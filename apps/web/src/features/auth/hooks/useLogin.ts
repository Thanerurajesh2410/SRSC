import { useMutation } from "@tanstack/react-query";
import { login } from "../api/auth.api";
import { authService } from "../../../services/auth.service";

export function useLogin() {
  return useMutation({
    mutationFn: login,

    onSuccess: (data) => {
      authService.setToken(data.accessToken);
    },
  });
}