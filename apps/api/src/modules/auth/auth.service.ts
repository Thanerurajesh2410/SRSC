import bcrypt from "bcrypt";
import { AuthRepository } from "./auth.repository";

const repository = new AuthRepository();

export class AuthService {
  async register(data: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    phone?: string;
    roleId: string;
  }) {
    const existingUser = await repository.findByEmail(data.email);

    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return repository.createUser({
      ...data,
      password: hashedPassword,
    });
  }
}