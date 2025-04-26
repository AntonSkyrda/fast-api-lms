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
export const courseFormSchema = z.object({
  name: z
    .string({ required_error: "Це поле обовʼязкове!" })
    .trim()
    .min(5, { message: "Назва курсу має містити хоча б 5 символів" })
    .max(255, {
      message: "Назва курсу не має перевищувати 255 символів",
    })
    .trim(),
  description: z
    .string({ required_error: "Це поле обовʼязкове!" })
    .trim()
    .min(5, { message: "Опис курсу має містити хоча б 5 символів" })
    .max(500, {
      message: "Опис курсу не має перевищувати 500 символів",
    }),
});

export const courseUpdateSchemaPartial = courseFormSchema.partial();

const baseUserFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Некоректний Email" })
    .min(5, { message: "Email має містити щонайменше 5 символів." }),
  password: z
    .string()
    .min(5, { message: "Пароль має містити щонайменше 5 символів." }),
  first_name: z
    .string()
    .trim()
    .min(3, { message: "Імʼя має містити щонайменше 3 символи" }),
  last_name: z
    .string()
    .trim()
    .min(3, { message: "Фамілія має містити щонайменше 3 символи" }),
  father_name: z
    .string()
    .trim()
    .min(5, { message: "По-батькові має містити щонайменше 3 символи" }),
  is_teacher: z.boolean(),
  is_student: z.boolean(),
  role: z.string().optional(),
});

const roleRefinement = (data: { is_teacher?: boolean; is_student?: boolean }) =>
  (data.is_teacher && !data.is_student) ||
  (!data.is_teacher && data.is_student);

export const userAddFormSchema = baseUserFormSchema.refine(roleRefinement, {
  message: "Ви повинні обрати одну роль: або вчитель, або студент",
  path: ["role"],
});

export const userUpdateFormSchema = baseUserFormSchema.partial().refine(
  (data) => {
    if (data.is_teacher !== undefined && data.is_student !== undefined) {
      return roleRefinement(data);
    }
    return true;
  },
  {
    message: "Ви повинні обрати одну роль: або вчитель, або студент",
    path: ["role"],
  },
);

export const groupFormSchema = z.object({
  name: z
    .string({ required_error: "Це поле обовʼязкове!" })
    .trim()
    .min(3, { message: "Назва груп має містити хоча б 3 символи" })
    .max(100, {
      message: "Назва групи не має перевищувати 100 символів",
    }),
  year_of_study: z
    .number()
    .int()
    .min(1, {
      message: "Рік навчання не може бути меншим за 1.",
    })
    .max(4, `Рік навчання не може бути більшим за 4.`),
});

export const groupUpdateSchemaPartial = groupFormSchema.partial();

export const programFormSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, { message: "Назва має містити хоча б 5 символів" }),
  order: z.number({ required_error: "Це поле обовʼязкове!" }).int(),
  count_hours: z
    .number({ required_error: "Це поле обовʼязкове!" })
    .int({ message: "Це поле може мати лише цілі числа." })
    .min(1, { message: "Мінімальна кількість годин - 1" })
    .max(50, "Максимальна кількість годин - 50"),
  course_id: z.number({ required_error: "Це поле обовʼязкове!" }).int(),
});

export const programUpdateFormSchema = programFormSchema.partial();
