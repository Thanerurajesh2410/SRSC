export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  phone?: string;
  roleId: string;
}

export interface AuthResponse {
  user: {
    id: string;
    firstName: string;
    lastName?: string | null;
    email: string;
    roleId: string;
  };
  accessToken: string;
}
