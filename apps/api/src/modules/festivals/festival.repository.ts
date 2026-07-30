import { prisma } from "../../config/database";
import { Prisma } from "@prisma/client";

class FestivalRepository {
  async findAll() {
    return prisma.festival.findMany({
      orderBy: { startDate: "asc" },
    });
  }

  async findById(id: string) {
    return prisma.festival.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.FestivalCreateInput) {
    return prisma.festival.create({
      data,
    });
  }

  async update(id: string, data: Prisma.FestivalUpdateInput) {
    return prisma.festival.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.festival.delete({
      where: { id },
    });
  }
}

export default new FestivalRepository();
