import { z } from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2).max(50),

  lastName: z.string().max(50).optional(),

  email: z.email(),

  password: z.string().min(8),

  phone: z.string().optional(),

  roleId: z.string(),
});