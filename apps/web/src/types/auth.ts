export interface LoginRequest {
  email: string;
  password: string;
}

export interface User {
  id: string;
  firstName: string;
  email: string;
  roleId: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    accessToken: string;
    user: User;
  };
}