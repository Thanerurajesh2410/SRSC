import { User } from "@prisma/client";
import { prisma } from "../../config/prisma";


export class AuthRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async findById(id: string) {
    return prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        roleId: true,
        createdAt: true,
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