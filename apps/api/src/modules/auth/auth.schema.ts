import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().max(50).optional(),
  email: z.string().email(),
  password: z.string().min(8),
  phone: z.string().optional(),
  roleId: z.string(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});