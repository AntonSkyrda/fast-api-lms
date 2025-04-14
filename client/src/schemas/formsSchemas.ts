import { z } from "zod";

// Login validation schema for login form
export const loginFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(2, { message: "Username має містити щонайменше 2 символи." }),
  password: z
    .string()
    .min(5, { message: "Пароль має містити щонайменше 5 символи." }),
});

// Teacher id validation for Add teacher form
export const addTeacherToCourseFormSchema = z.object({
  teacherId: z.number(),
});

// Course scheme for form validation for create/update course
export const courseAddAndUpdateFormSchema = z.object({
  name: z
    .string({ required_error: "Це поле обовʼязкове!" })
    .min(5, { message: "Назва курсу має містити хоча б 5 символів" })
    .max(255, {
      message: "Назва курсу не має перевищувати 255 символів",
    })
    .trim(),
  description: z
    .string({ required_error: "Це поле обовʼязкове!" })
    .min(5, { message: "Опис курсу має містити хоча б 5 символів" })
    .max(500, {
      message: "Опис курсу не має перевищувати 500 символів",
    })
    .trim(),
});

export const userAddFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Некоректний Email" })
    .min(5, { message: "Email має містити щонайменше 5 символів." }),
  password: z
    .string()
    .min(5, { message: "Пароль має містити щонайменше 5 символів." }),
  first_name: z
    .string()
    .min(3, { message: "Імʼя має містити щонайменше 3 символи" })
    .trim(),
  last_name: z
    .string()
    .min(3, { message: "Фамілія має містити щонайменше 3 символи" })
    .trim(),
  father_name: z
    .string()
    .min(5, { message: "По-батькові має містити щонайменше 3 символи" })
    .trim(),
  is_teacher: z.boolean(),
  is_student: z.boolean(),
});

// User schema for validation user update form
export const userUpdateFormSchema = userAddFormSchema.partial();
