import { z } from "zod";
import { teacherSchema } from "./userSchema";
import { groupSchema } from "./groupSchema";

export const courseSimpleSchema = z.object({
  id: z.number().int().optional(),
  name: z
    .string()
    .max(255, {
      message: "Назва курсу не має перевищувати 255 символів",
    })
    .trim(),
  description: z
    .string()
    .max(500, {
      message: "Опис курсу не має перевищувати 255 символів",
    })
    .trim(),
  teacher: z.number().int().optional(),
  groups: z.array(z.number()).optional(),
});

export const coursesSchema = z.array(courseSimpleSchema);

export const courseDetailSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().max(255),
  description: z.string(),
  teacher: teacherSchema.optional(),
  groups: z.array(groupSchema).optional(),
});
