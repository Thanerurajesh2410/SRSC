import { z } from "zod";

export const createDonationSchema = z
  .object({
    donorName: z.string().min(3),

    mobile: z.string().optional(),

    email: z.string().email().optional(),

    address: z.string().optional(),

    amount: z.number().positive(),

    category: z.enum([
      "GENERAL",
      "TEMPLE_CONSTRUCTION",
      "ANNADANAM",
      "FESTIVAL",
      "GOSHALA",
      "SPECIAL_POOJA",
      "CORPUS",
    ]),

    paymentMode: z.enum([
      "CASH",
      "UPI",
      "BANK_TRANSFER",
      "CHEQUE",
    ]),

    purpose: z.string().optional(),

    transactionId: z.string().optional(),

    donationDate: z.coerce.date(),

    remarks: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.paymentMode === "UPI" ||
        data.paymentMode === "BANK_TRANSFER") &&
      !data.transactionId
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["transactionId"],
        message:
          "Transaction ID is required for UPI/Bank Transfer",
      });
    }
  });