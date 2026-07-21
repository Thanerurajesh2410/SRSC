import bcrypt from "bcrypt";
import { AuthRepository } from "./auth.repository";
import { generateAccessToken } from "../../utils/jwt";

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

  async login(data: {
    email: string;
    password: string;
  }) {
    const user = await repository.findByEmail(data.email);

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const passwordMatched = await bcrypt.compare(
      data.password,
      user.password
    );

    if (!passwordMatched) {
      throw new Error("Invalid email or password");
    }

    const accessToken = generateAccessToken({
      userId: user.id,
      email: user.email,
      roleId: user.roleId,
    });

    return {
      user,
      accessToken,
    };
  }
}