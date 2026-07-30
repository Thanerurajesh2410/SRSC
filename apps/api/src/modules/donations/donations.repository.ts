import { Prisma } from "@prisma/client";
import { prisma } from "../../config/prisma";

export class DonationRepository {

  create(data: Prisma.DonationCreateInput) {
    return prisma.donation.create({
      data,
    });
  }

  findAll() {
    return prisma.donation.findMany({
      orderBy: {
        donationDate: "desc",
      },
    });
  }

  findById(id: string) {
    return prisma.donation.findUnique({
      where: { id },
    });
  }

  update(id: string, data: Prisma.DonationUpdateInput) {
    return prisma.donation.update({
      where: { id },
      data,
    });
  }

  delete(id: string) {
    return prisma.donation.delete({
      where: { id },
    });
  }

  count() {
    return prisma.donation.count();
  }

  findLatestReceipt() {
    return prisma.donation.findFirst({
      orderBy: {
        createdAt: "desc",
      },
      select: {
        receiptNo: true,
      },
    });
  }

  exists(receiptNo: string) {
    return prisma.donation.findUnique({
      where: {
        receiptNo,
      },
    });
  }

}