import { z } from "zod";
import { teacherSchema } from "./usersSchema";
import { coursePlainSchema, groupPlainSchema } from "./plainShemas";
import { backendResponseForListsSchema } from "./backendResponseForListsSchema";

export const coursePlainPartialSchema = coursePlainSchema.partial();

export const coursesArrayShema = z.array(coursePlainSchema);

// Courses scheme from backend with get /courses
export const coursesSchema = backendResponseForListsSchema.extend({
  items: coursesArrayShema,
});

// Course scheme from backend wit get /courses/id
export const courseDetailedSchema = coursePlainSchema.extend({
  teacher: z.union([teacherSchema, z.null()]),
  groups: z.union([z.array(groupPlainSchema), z.tuple([])]),
});
