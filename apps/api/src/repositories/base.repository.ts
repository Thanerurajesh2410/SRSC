import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export abstract class BaseRepository {
  protected prisma = prisma;

  constructor(
    protected readonly model: keyof PrismaClient
  ) {}
}