import { prisma } from "../../config/prisma";

class ReceiptRepository {
  /**
   * Fetch donation details required for receipt generation
   */
  async findDonationById(donationId: string) {
    return prisma.donation.findUnique({
      where: {
        id: donationId,
      },
      select: {
        id: true,

        receiptNo: true,

        donorName: true,

        mobile: true,

        email: true,

        address: true,

        amount: true,

        paymentMode: true,

        category: true,

        transactionId: true,

        purpose: true,

        remarks: true,

        donationDate: true,

        createdAt: true,
      },
    });
  }
}

export const receiptRepository = new ReceiptRepository();