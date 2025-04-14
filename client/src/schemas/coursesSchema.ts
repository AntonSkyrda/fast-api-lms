import { z } from "zod";
import { teacherSchema } from "./usersSchema";
import { coursePlainSchema, groupPlainSchema } from "./plainShemas";

export const coursePlainPartialSchema = coursePlainSchema.partial();

// Courses scheme from backend with get /courses
export const coursesSchema = z.array(coursePlainSchema);

// Course scheme from backend wit get /courses/id
export const courseDetailedSchema = coursePlainSchema.extend({
  teacher: z.union([teacherSchema, z.null()]),
  groups: z.union([z.array(groupPlainSchema), z.tuple([])]),
});
