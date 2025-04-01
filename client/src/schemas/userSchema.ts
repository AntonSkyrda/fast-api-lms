import { z } from "zod";

export const userSchema = z.object({
  id: z.number().int(),
  email: z.string().email(),
  is_active: z.boolean(),
  is_superuser: z.boolean(),
  is_verified: z.boolean(),
  first_name: z.string(),
  last_name: z.string(),
  father_name: z.string(),
  is_teacher: z.boolean(),
  is_student: z.boolean(),
});

export const studentSchema = userSchema.extend({
  is_student: z.literal(true),
});

export const teacherSchema = userSchema.extend({
  is_teacher: z.literal(true),
});

export const superuserSchema = userSchema.extend({
  is_superuser: z.literal(true),
});

// Схема для студента-викладача (якщо потрібно)
export const studentTeacherSchema = userSchema.extend({
  is_student: z.literal(true),
  is_teacher: z.literal(true),
});
