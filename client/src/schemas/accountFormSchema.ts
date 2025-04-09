import { z } from "zod";

export const accountFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Некоректний Email" })
    .min(5, { message: "Username має містити щонайменше 5 символів." }),
  password: z.string().optional(),
  first_name: z
    .string()
    .min(3, { message: "Імʼя має містити щонайменше 3 символи" })
    .trim(),
  last_name: z
    .string()
    .min(3, { message: "Фамілія має містити щонайменше 3 символи" })
    .trim(),
  father_name: z.string().trim().optional(),
  is_teacher: z.boolean(),
  is_student: z.boolean(),
});
