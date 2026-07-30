import { z } from "zod";
import { COMMITTEE_DESIGNATIONS } from "./committee.constants";

export const createCommitteeSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, "Committee member name must be at least 3 characters")
      .max(100, "Committee member name cannot exceed 100 characters"),

    designation: z.enum(COMMITTEE_DESIGNATIONS, {
      message: "Invalid committee designation",
    }),

    phone: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/, "Phone number must be a valid 10-digit Indian mobile number")
      .optional(),

    email: z
      .string()
      .trim()
      .email("Invalid email address")
      .optional(),

    address: z
      .string()
      .trim()
      .max(255, "Address cannot exceed 255 characters")
      .optional(),
  }),
});

export const updateCommitteeSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3)
      .max(100)
      .optional(),

    designation: z
      .enum(COMMITTEE_DESIGNATIONS)
      .optional(),

    phone: z
      .string()
      .trim()
      .regex(/^[6-9]\d{9}$/)
      .optional(),

    email: z
      .string()
      .trim()
      .email()
      .optional(),

    address: z
      .string()
      .trim()
      .max(255)
      .optional(),

    isActive: z.boolean().optional(),
  }),
});

export const committeeIdSchema = z.object({
  params: z.object({
    id: z.uuid("Invalid committee id"),
  }),
});