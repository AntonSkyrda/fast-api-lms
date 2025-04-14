import { z } from "zod";
import { studentsSchema } from "./usersSchema";
import { coursePlainSchema, groupPlainSchema } from "./plainShemas";

export const groupsSchema = z.array(groupPlainSchema);

export const groupDetailedSchema = groupPlainSchema.extend({
  students: studentsSchema,
  courses: z.union([z.array(coursePlainSchema), z.tuple([])]),
});
