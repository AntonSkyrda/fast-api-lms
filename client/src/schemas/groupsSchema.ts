import { z } from "zod";
import { studentsSchema } from "./usersSchema";
import { coursePlainSchema, groupPlainSchema } from "./plainShemas";
import { backendResponseForListsSchema } from "./backendResponseForListsSchema";

export const groupsSchema = backendResponseForListsSchema.extend({
  items: z.array(groupPlainSchema),
});

export const groupsArrayShema = z.array(groupPlainSchema);

export const groupDetailedSchema = groupPlainSchema.extend({
  students: studentsSchema,
  courses: z.union([z.array(coursePlainSchema), z.tuple([])]),
});
