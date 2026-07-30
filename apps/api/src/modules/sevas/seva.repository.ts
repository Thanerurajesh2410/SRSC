import { prisma } from "../../config/database";
import { Prisma } from "@prisma/client";

class SevaRepository {
  async findAll(search?: string, sevaType?: any) {
    const where: Prisma.SevaBookingWhereInput = {
      ...(sevaType && { sevaType }),
      ...(search && {
        OR: [
          { bookingNo: { contains: search, mode: "insensitive" } },
          { devoteeName: { contains: search, mode: "insensitive" } },
          { phone: { contains: search, mode: "insensitive" } },
          { gotram: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    return prisma.sevaBooking.findMany({
      where,
      orderBy: { sevaDate: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.sevaBooking.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.SevaBookingCreateInput) {
    return prisma.sevaBooking.create({
      data,
    });
  }

  async update(id: string, data: Prisma.SevaBookingUpdateInput) {
    return prisma.sevaBooking.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.sevaBooking.delete({
      where: { id },
    });
  }

  async getCount() {
    return prisma.sevaBooking.count();
  }
}

export default new SevaRepository();
