import { z } from "zod";

export const createUserSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.email(),
  phone: z.string().optional(),
  passwordHash: z.string().min(1),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
