import { z } from "zod";

export const expenseSchema = z
  .object({
    expenseDate: z.string(),

    vendorName: z
      .string()
      .min(3, "Vendor name must be at least 3 characters"),

    description: z
      .string()
      .min(3, "Description is required"),

    amount: z.coerce
      .number()
      .positive("Amount must be greater than zero"),

    category: z.enum([
      "CONSTRUCTION",
      "ANNADANAM",
      "PUJA_MATERIALS",
      "SALARY",
      "ELECTRICITY",
      "MAINTENANCE",
      "FESTIVAL",
      "OTHER",
    ]),

    paymentMode: z.enum([
      "CASH",
      "UPI",
      "BANK_TRANSFER",
      "CHEQUE",
    ]),

    transactionId: z.string().optional(),

    billNumber: z.string().optional(),

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

export type ExpenseFormValues = z.infer<typeof expenseSchema>;