import { z } from "zod";
import { studentArraySchema } from "./usersSchema";
import { coursePlainSchema, groupPlainSchema } from "./plainShemas";
import { backendResponseForListsSchema } from "./backendResponseForListsSchema";

export const groupsArrayShema = z.array(groupPlainSchema);

export const groupsSchema = backendResponseForListsSchema.extend({
  items: groupsArrayShema,
});

export const groupDetailedSchema = groupPlainSchema.extend({
  students: studentArraySchema,
  courses: z.union([z.array(coursePlainSchema), z.tuple([])]),
});
