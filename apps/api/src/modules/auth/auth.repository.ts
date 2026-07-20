import { PrismaClient, User } from "@prisma/client";

const prisma = new PrismaClient();

export class AuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async createUser(data: {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    phone?: string;
    roleId: string;
  }): Promise<User> {
    return prisma.user.create({
      data,
    });
  }
}