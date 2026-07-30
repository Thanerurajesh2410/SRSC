import { prisma } from "../../config/prisma";

export class DevoteeRepository {
  async findByPhone(phone: string) {
    return prisma.devotee.findUnique({
      where: { phone },
    });
  }

  async upsertDevotee(data: {
    name: string;
    phone: string;
    email?: string;
    address?: string;
    gotram?: string;
    star?: string;
  }) {
    const existing = await this.findByPhone(data.phone);
    if (existing) {
      return prisma.devotee.update({
        where: { id: existing.id },
        data: {
          name: data.name || existing.name,
          email: data.email || existing.email,
          address: data.address || existing.address,
          gotram: data.gotram || existing.gotram,
          star: data.star || existing.star,
        },
      });
    }

    return prisma.devotee.create({
      data,
    });
  }

  async getDonationsByPhone(phone: string) {
    return prisma.donation.findMany({
      where: {
        mobile: phone,
      },
      orderBy: { donationDate: "desc" },
    });
  }

  async getSevasByPhone(phone: string) {
    return prisma.sevaBooking.findMany({
      where: {
        phone: phone,
      },
      orderBy: { sevaDate: "desc" },
    });
  }
}
