import { prisma } from "../../config/database";
import { Prisma } from "@prisma/client";

class SlidesRepository {
  async findAll() {
    return prisma.homeSlide.findMany({
      orderBy: { displayOrder: "asc" },
    });
  }

  async findById(id: string) {
    return prisma.homeSlide.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.HomeSlideCreateInput) {
    return prisma.homeSlide.create({
      data,
    });
  }

  async update(id: string, data: Prisma.HomeSlideUpdateInput) {
    return prisma.homeSlide.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.homeSlide.delete({
      where: { id },
    });
  }
}

export default new SlidesRepository();
