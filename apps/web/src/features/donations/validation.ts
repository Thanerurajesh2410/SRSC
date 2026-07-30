import { z } from "zod";

export const donationSchema = z
  .object({
    donorName: z
      .string()
      .min(3, "Donor name must be at least 3 characters"),

    mobile: z.string().optional(),

    email: z.email().optional(),

    address: z.string().optional(),

    amount: z.coerce
      .number()
      .positive("Amount must be greater than zero"),

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

    donationDate: z.string(),

    remarks: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      (data.paymentMode === "UPI" ||
        data.paymentMode === "BANK_TRANSFER") &&
      !data.transactionId
    ) {
      ctx.addIssue({
        code: "custom",
        path: ["transactionId"],
        message:
          "Transaction ID is required for UPI and Bank Transfer.",
      });
    }
  });

export type DonationFormValues = z.infer<typeof donationSchema>;