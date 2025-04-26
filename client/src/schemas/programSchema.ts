import { z } from "zod";
import { backendResponseForListsSchema } from "./backendResponseForListsSchema";
import { programPlainSchema } from "./plainShemas";

export const programPlainPartialSchema = programPlainSchema.partial();

export const programsArraySchema = z.array(programPlainSchema);

export const programsScheam = backendResponseForListsSchema.extend({
  items: programsArraySchema,
});
