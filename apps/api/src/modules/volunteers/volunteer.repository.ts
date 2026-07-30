import { prisma } from "../../config/database";
import { Prisma } from "@prisma/client";

class VolunteerRepository {
  async findAll(search?: string) {
    const where: Prisma.VolunteerWhereInput = search
      ? {
          OR: [
            { volunteerCode: { contains: search, mode: "insensitive" } },
            { name: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
            { skills: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    return prisma.volunteer.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.volunteer.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.VolunteerCreateInput) {
    return prisma.volunteer.create({
      data,
    });
  }

  async update(id: string, data: Prisma.VolunteerUpdateInput) {
    return prisma.volunteer.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.volunteer.delete({
      where: { id },
    });
  }

  async getCount() {
    return prisma.volunteer.count();
  }
}

export default new VolunteerRepository();
