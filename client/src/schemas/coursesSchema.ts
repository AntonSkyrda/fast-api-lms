import { z } from "zod";
import { teacherSchema } from "./userSchema";
import { groupSchema } from "./groupSchema";

export const courseSchema = z.object({
  id: z.number().int(),
  name: z.string().max(255, {
    message: "Назва курсу не має перевищувати 255 символів",
  }),
  description: z.string(),
  teacher: z.number().int().optional(),
  groups: z.array(z.number()).optional(),
});

export const coursesSchema = z.array(courseSchema);

export const courseDetailSchema = z.object({
  id: z.number().int().optional(),
  name: z.string().max(255),
  description: z.string(),
  teacher: teacherSchema,
  groups: z.array(groupSchema),
});
