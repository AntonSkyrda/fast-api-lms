import { z } from "zod";

export const addTeacherToCourseFormSchema = z.object({
  teacherId: z.union([z.number(), z.null()]),
});
