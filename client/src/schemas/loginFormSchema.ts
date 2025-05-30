import { z } from "zod";

export const loginFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(2, { message: "Username має містити щонайменше 2 символи." }),
  password: z
    .string()
    .min(5, { message: "Пароль має містити щонайменше 5 символи." }),
});
