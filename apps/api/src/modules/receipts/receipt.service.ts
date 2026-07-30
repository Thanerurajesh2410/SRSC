import PDFDocument = require("pdfkit");
import { AppError } from "../../errors/AppError";
import { receiptRepository } from "./receipt.repository";
import { receiptTemplate } from "./receipt.template";

class ReceiptService {
  /**
   * Generate donation receipt
   */
  async generateReceipt(donationId: string) {
    // Fetch donation
    const donation = await receiptRepository.findDonationById(donationId);

    if (!donation) {
      throw new AppError("Donation not found.", 404);
    }

    // Create PDF document
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
    });

    // Generate PDF content
receiptTemplate.generate(doc, {
  receiptNumber: donation.receiptNo,

  donorName: donation.donorName,

  phone: donation.mobile,

  email: donation.email,

  address: donation.address,

  amount: donation.amount.toString(),

  paymentMethod: donation.paymentMode,

  donationType: donation.category,

  referenceNo: donation.transactionId,

  donation: donation.purpose,

  remarks: donation.remarks,

  donatedOn: donation.donationDate,

  isAnonymous: false,
});

    doc.end();

    return doc;
  }
}

export const receiptService = new ReceiptService();