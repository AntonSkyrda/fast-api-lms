import { z } from "zod";

export const authSchema = z.object({
  access_token: z.string().jwt(),
  token_type: z.literal("bearer"),
});
