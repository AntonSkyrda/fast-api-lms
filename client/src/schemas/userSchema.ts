import { z } from "zod";

export const userSchema = z.object({
  id: z.number().int().optional(),
  first_name: z.string().max(150).optional(),
  last_name: z.string().max(150).optional(),
  email: z.string().email().max(254).optional(),
  role: z.union([z.literal("teacher"), z.literal("student")]),
});

export const studentSchema = userSchema.extend({
  role: z.literal("student"),
});

export const teacherSchema = userSchema.extend({
  role: z.literal("teacher"),
});
