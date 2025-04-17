import { z } from "zod";

export const backendResponseForListsSchema = z.object({
  total: z.number().int(),
  items: z.tuple([]),
});
