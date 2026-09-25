import { z } from 'zod';

export const signupSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(255),
  password: z.string().min(8).max(72),
  age: z.number().int().min(1).max(130).optional(),
  caregiverName: z.string().trim().max(100).optional(),
});

export const signinSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});
