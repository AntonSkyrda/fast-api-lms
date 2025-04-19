import { z } from "zod";

// Course scheme from backend with get /courses
export const coursePlainSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  description: z.string(),
});

export const groupPlainSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().max(255),
  year_of_study: z.number().int(),
});

// Defoult user scheme
export const userSchema = z.object({
  id: z.number().int(),
  email: z.string().email({ message: "Некоректний Email" }),
  password: z.string().optional(),
  is_active: z.boolean(),
  is_superuser: z.boolean(),
  is_verified: z.boolean(),
  first_name: z.string(),
  last_name: z.string(),
  father_name: z.string(),
  is_teacher: z.boolean(),
  is_student: z.boolean(),
});
