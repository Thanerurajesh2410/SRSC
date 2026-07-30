import { z } from "zod";

export const createExpenseSchema = z.object({
    title: z
        .string()
        .trim()
        .min(3, "Title must be at least 3 characters")
        .max(100, "Title cannot exceed 100 characters"),

    category: z.enum([
        "CONSTRUCTION",
        "FESTIVAL",
        "MAINTENANCE",
        "ELECTRICITY",
        "WATER",
        "SALARY",
        "DONATION_UTILIZATION",
        "MISCELLANEOUS",
    ]),

    amount: z
        .number()
        .positive("Amount must be greater than zero"),

    paymentMode: z.enum([
        "CASH",
        "UPI",
        "BANK_TRANSFER",
        "CHEQUE",
    ]),

    expenseDate: z.coerce.date(),

    paidTo: z
        .string()
        .trim()
        .min(2, "Paid To is required")
        .max(100),

    remarks: z
        .string()
        .trim()
        .max(500)
        .optional(),
});

export const updateExpenseSchema =
    createExpenseSchema.partial();