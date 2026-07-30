import { prisma } from "../../config/database";
import { Prisma } from "@prisma/client";

class MaterialRepository {
  async findAll(search?: string, type?: any) {
    const where: Prisma.MaterialDonationWhereInput = {
      ...(type && { materialType: type }),
      ...(search && {
        OR: [
          { receiptNo: { contains: search, mode: "insensitive" } },
          { donorName: { contains: search, mode: "insensitive" } },
          { mobile: { contains: search, mode: "insensitive" } },
          { itemDescription: { contains: search, mode: "insensitive" } },
        ],
      }),
    };

    return prisma.materialDonation.findMany({
      where,
      orderBy: { donationDate: "desc" },
    });
  }

  async findById(id: string) {
    return prisma.materialDonation.findUnique({
      where: { id },
    });
  }

  async create(data: Prisma.MaterialDonationCreateInput) {
    return prisma.materialDonation.create({
      data,
    });
  }

  async update(id: string, data: Prisma.MaterialDonationUpdateInput) {
    return prisma.materialDonation.update({
      where: { id },
      data,
    });
  }

  async delete(id: string) {
    return prisma.materialDonation.delete({
      where: { id },
    });
  }

  async getCount() {
    return prisma.materialDonation.count();
  }

  async getSummaryByType() {
    const summary = await prisma.materialDonation.groupBy({
      by: ["materialType"],
      _sum: {
        quantity: true,
        estimatedValue: true,
      },
      _count: {
        _all: true,
      },
    });

    return summary.map((item) => ({
      materialType: item.materialType,
      totalQuantity: Number(item._sum.quantity ?? 0),
      totalEstimatedValue: Number(item._sum.estimatedValue ?? 0),
      count: item._count._all,
    }));
  }
}

export default new MaterialRepository();
