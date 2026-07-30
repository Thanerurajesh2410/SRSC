import PDFDocument = require("pdfkit");

export interface ReceiptData {
  receiptNumber: string;

  donorName: string;
  phone?: string | null;
  email?: string | null;
  address?: string | null;

  amount: number | string;

  paymentMethod: string;
  donationType: string;

  referenceNo?: string | null;
  donation?: string | null;
  remarks?: string | null;

  donatedOn: Date;

  isAnonymous: boolean;
}

export class ReceiptTemplate {
  generate(doc: InstanceType<typeof PDFDocument>, data: ReceiptData) {
    // Temple Name
    doc
      .fontSize(22)
      .text("SRI RAMA SEVA TRUST", {
        align: "center",
      });

    doc
      .fontSize(14)
      .text("Donation Receipt", {
        align: "center",
      });

    doc.moveDown();

    doc.moveTo(50, 110).lineTo(550, 110).stroke();

    doc.moveDown();

    doc.fontSize(12);

    doc.text(`Receipt No : ${data.receiptNumber}`);
    doc.text(`Date       : ${data.donatedOn.toLocaleDateString()}`);

    doc.moveDown();

    doc.moveTo(50, 180).lineTo(550, 180).stroke();

    doc.moveDown();

    doc.text(`Donor Name     : ${data.donorName}`);
    doc.text(`Phone          : ${data.phone ?? "-"}`);
    doc.text(`Email          : ${data.email ?? "-"}`);
    doc.text(`Address        : ${data.address ?? "-"}`);

    doc.moveDown();

    doc.moveTo(50, 300).lineTo(550, 300).stroke();

    doc.moveDown();

    doc.text(`Donation Type  : ${data.donationType}`);
    doc.text(`Payment Method : ${data.paymentMethod}`);
    doc.text(`Reference No   : ${data.referenceNo ?? "-"}`);

    doc.moveDown();

    doc
      .fontSize(18)
      .text(`Amount : ₹ ${data.amount}`, {
        align: "right",
      });

    doc.moveDown();

    doc.fontSize(12);

    doc.text(`Remarks : ${data.remarks ?? "-"}`);

    doc.moveDown(2);

    doc.text("Thank you for your generous contribution.", {
      align: "center",
    });

    doc.moveDown(3);

    doc.text("Authorized Signature", {
      align: "right",
    });

    return doc;
  }
}

export const receiptTemplate = new ReceiptTemplate();