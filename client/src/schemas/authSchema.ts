import { z } from "zod";

export const authSchema = z.object({
  access_token: z.string(),
  token_type: z.literal("bearer"),
});
