import {
  Donation,
  Prisma,
  DonationCategory,
  PaymentMode,
} from "@prisma/client";

import { DonationRepository } from "../../modules/donations/donations.repository";
import { CreateDonationDto, UpdateDonationDto } from "./donation.types";
import { generateReceiptNumber } from "../../utils/receiptGenerator";
import { AppError } from "../../errors/AppError";

export class DonationService {
  private repository = new DonationRepository();

  async create(
    payload: CreateDonationDto
  ): Promise<Donation> {

    // Business Rule 1
    if (payload.amount <= 0) {
      throw new Error("Donation amount must be greater than zero.");
    }

    // Business Rule 2
    if (
      (payload.paymentMode === PaymentMode.UPI ||
        payload.paymentMode === PaymentMode.BANK_TRANSFER) &&
      !payload.transactionId
    ) {
      throw new Error(
        "Transaction ID is mandatory for UPI and Bank Transfer."
      );
    }

    // Generate Receipt Number
    const latestDonation =
      await this.repository.findLatestReceipt();

    const receiptNo =
      generateReceiptNumber(latestDonation?.receiptNo);

    const existingDonation =
      await this.repository.exists(receiptNo);

    if (existingDonation) {
      throw new AppError(
        "Receipt number already exists.",
        409
      );
    }

    const donation: Prisma.DonationCreateInput = {
      receiptNo,

      donorName: payload.donorName,

      mobile: payload.mobile,

      email: payload.email,

      address: payload.address,

      amount: new Prisma.Decimal(payload.amount),

      category: payload.category,

      paymentMode: payload.paymentMode,

      purpose: payload.purpose,

      transactionId: payload.transactionId,


      donationDate: new Date(payload.donationDate),

      remarks: payload.remarks,

    };

    console.log("========== CREATE DONATION ==========");
    console.log(donation);
    console.log("Donation Date:", donation.donationDate);
    console.log(
      "Is Date:",
      donation.donationDate instanceof Date
    );
    console.log("====================================");

    return this.repository.create(donation);
  }

  async getAll() {
    return this.repository.findAll();
  }

  async getById(id: string) {

    const donation =
      await this.repository.findById(id);

    if (!donation) {
      throw new Error("Donation not found.");
    }

    return donation;
  }

  async update(
    id: string,
    payload: UpdateDonationDto
  ) {

    await this.getById(id);

    const updateData: Prisma.DonationUpdateInput = {
      donorName: payload.donorName,
      mobile: payload.mobile,
      email: payload.email,
      address: payload.address,

      amount:
        payload.amount !== undefined
          ? new Prisma.Decimal(payload.amount)
          : undefined,

      category: payload.category,
      paymentMode: payload.paymentMode,
      purpose: payload.purpose,
      transactionId: payload.transactionId,

      donationDate:
        payload.donationDate
          ? new Date(payload.donationDate)
          : undefined,

      remarks: payload.remarks,
    };

    return this.repository.update(id, updateData);
  }

  async delete(id: string) {

    await this.getById(id);

    return this.repository.delete(id);
  }

  async getStats() {

    const donations =
      await this.repository.findAll();

    const totalDonation = donations.reduce(
      (sum, donation) =>
        sum + Number(donation.amount),
      0
    );

    return {

      totalDonation,

      donationCount: donations.length,
    };
  }

  async createBulk(payloads: CreateDonationDto[]): Promise<{ count: number; donations: Donation[] }> {
    // Business Rule: Strictly exclude transactions where amount < 10
    const validPayloads = payloads.filter((p) => Number(p.amount) >= 10);

    if (validPayloads.length === 0) {
      return { count: 0, donations: [] };
    }

    const createdDonations: Donation[] = [];
    let latestDonation = await this.repository.findLatestReceipt();
    let currentReceipt = latestDonation?.receiptNo;

    for (const payload of validPayloads) {
      currentReceipt = generateReceiptNumber(currentReceipt);

      const donationData: Prisma.DonationCreateInput = {
        receiptNo: currentReceipt,
        donorName: payload.donorName || "Anonymous Devotee",
        mobile: payload.mobile || null,
        email: payload.email || null,
        address: payload.address || null,
        amount: new Prisma.Decimal(payload.amount),
        category: payload.category || DonationCategory.GENERAL,
        paymentMode: payload.paymentMode || PaymentMode.BANK_TRANSFER,
        purpose: payload.purpose || "Bank Statement Import",
        transactionId: payload.transactionId || null,
        donationDate: payload.donationDate ? new Date(payload.donationDate) : new Date(),
        remarks: payload.remarks || "Extracted from Bank Statement",
      };

      const created = await this.repository.create(donationData);
      createdDonations.push(created);
    }

    return {
      count: createdDonations.length,
      donations: createdDonations,
    };
  }
}