import { z } from "zod";
import { studentsSchema, teachersSchema } from "../../schemas/usersSchema";
import { userSchema } from "../../schemas/plainShemas";
import {
  userAddFormSchema,
  userUpdateFormSchema,
} from "../../schemas/formsSchemas";
import { ITEMS_PER_PAGE } from "../consts";
import interactWithAPI from "./apiBase";

export const getUserByToken = () =>
  interactWithAPI<typeof userSchema, object>({
    url: "users/me",
    method: "get",
    schema: userSchema,
    methodErrorMessage: "Неможливо отримати дані користувача.",
    serverErrorRecourseName: "Auth",
  });

export const addUser = (data: z.infer<typeof userAddFormSchema>) =>
  interactWithAPI<typeof userSchema, z.infer<typeof userAddFormSchema>>({
    url: "auth/register",
    method: "post",
    schema: userSchema,
    data,
    methodErrorMessage: "Не вдалось додати користувача.",
    serverErrorRecourseName: "User",
  });

export const updateUser = (data: z.infer<typeof userUpdateFormSchema>) =>
  interactWithAPI<typeof userSchema, z.infer<typeof userUpdateFormSchema>>({
    url: "users/me",
    method: "patch",
    schema: userSchema,
    data,
    methodErrorMessage: "Сталася помилка при Оновленні даних.",
    serverErrorRecourseName: "User",
  });

export const getUserById = (userId: number) =>
  interactWithAPI<typeof userSchema, object>({
    url: `users/${userId}`,
    method: "get",
    schema: userSchema,
    methodErrorMessage: "Неможливо отримати дані користувача.",
    serverErrorRecourseName: "User",
  });

export const updateUserById = (
  updateData: z.infer<typeof userAddFormSchema>,
  userId: number,
) =>
  interactWithAPI<typeof userSchema, z.infer<typeof userAddFormSchema>>({
    url: `users/${userId}`,
    method: "patch",
    schema: userSchema,
    data: updateData,
    methodErrorMessage: "Неможливо оновити дані користувача.",
    serverErrorRecourseName: "User",
  });

export const deleteUserById = (userId: number) =>
  interactWithAPI<z.ZodVoid, object>({
    url: `users/${userId}`,
    method: "delete",
    schema: z.void(),
    methodErrorMessage: "Неможливо видалити користувача.",
    serverErrorRecourseName: "User",
  });

export const getTeachers = (offset: number = 0) =>
  interactWithAPI<typeof teachersSchema, object>({
    url: `teachers?limit=${ITEMS_PER_PAGE}&offset=${offset * ITEMS_PER_PAGE}`,
    method: "get",
    schema: teachersSchema,
    methodErrorMessage: "Сталася помилка при отримані даних викладачів.",
    serverErrorRecourseName: "Teachers",
  });

export const findTeachers = (searchStr: string = "") =>
  interactWithAPI<typeof teachersSchema, object>({
    url: `teachers?search=${searchStr}`,
    method: "get",
    schema: teachersSchema,
    methodErrorMessage: "Сталася помилка при отримані даних викладачів.",
    serverErrorRecourseName: "Teachers",
  });

export const getStudents = (offset: number = 0) =>
  interactWithAPI<typeof studentsSchema, object>({
    url: `students?limit=${ITEMS_PER_PAGE}&offset=${offset * ITEMS_PER_PAGE}`,
    method: "get",
    schema: studentsSchema,
    methodErrorMessage: "Сталася помилка при отримані даних студентів.",
    serverErrorRecourseName: "Students",
  });

export const findStudents = (searchStr: string = "") =>
  interactWithAPI<typeof studentsSchema, object>({
    url: `students?search=${searchStr}`,
    method: "get",
    schema: studentsSchema,
    methodErrorMessage: "Сталася помилка при отримані даних студентів.",
    serverErrorRecourseName: "Students",
  });
