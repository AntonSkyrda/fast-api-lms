import { z } from "zod";
import { teacherSchema } from "./userSchema";
import { groupSchema } from "./groupSchema";

// Course scheme from backend with get /courses
export const courseSimpleSchema = z.object({
  id: z.number().int().optional(),
  name: z.string(),
  description: z.string(),
  // teacher: teacherSchema,
  teacher: z.union([teacherSchema, z.null()]),
  groups: z.union([z.array(groupSchema), z.array(z.number())]).optional(),
});

// Courses scheme from backend with get /courses
export const coursesSchema = z.array(courseSimpleSchema);

// Course scheme from backend wit get /courses/id
export const courseDetailSchema = z.object({
  id: z.number().int(),
  name: z.string().max(255),
  description: z.string(),
  teacher: teacherSchema.optional(),
  groups: z.array(groupSchema).optional(),
});

// Course scheme for form validation for update/create course
export const courseSimpleFormSchema = z.object({
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
});
