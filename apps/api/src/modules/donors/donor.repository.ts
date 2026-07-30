import { prisma } from "../../config/database";
import { Prisma } from "@prisma/client";

class DonorRepository {
  async findAll(search?: string) {
    const where: Prisma.DonorWhereInput = search
      ? {
          OR: [
            { donorCode: { contains: search, mode: "insensitive" } },
            { name: { contains: search, mode: "insensitive" } },
            { phone: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
            { city: { contains: search, mode: "insensitive" } },
            { gotram: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    return prisma.donor.findMany({
      where,
      include: {
        familyMembers: true,
        donations: {
          take: 10,
          orderBy: { donationDate: "desc" },
        },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.donor.findUnique({
      where: { id },
      include: {
        familyMembers: true,
        donations: {
          orderBy: { donationDate: "desc" },
        },
      },
    });
  }

  async findByCode(donorCode: string) {
    return prisma.donor.findUnique({
      where: { donorCode },
    });
  }

  async create(data: Prisma.DonorCreateInput) {
    return prisma.donor.create({
      data,
      include: { familyMembers: true },
    });
  }

  async update(id: string, data: Prisma.DonorUpdateInput) {
    return prisma.donor.update({
      where: { id },
      data,
      include: { familyMembers: true },
    });
  }

  async delete(id: string) {
    return prisma.donor.delete({
      where: { id },
    });
  }

  async addFamilyMember(donorId: string, memberData: { name: string; relationship?: string; phone?: string; star?: string }) {
    return prisma.donorFamilyMember.create({
      data: {
        donorId,
        ...memberData,
      },
    });
  }

  async deleteFamilyMember(memberId: string) {
    return prisma.donorFamilyMember.delete({
      where: { id: memberId },
    });
  }

  async getCount() {
    return prisma.donor.count();
  }
}

export default new DonorRepository();
