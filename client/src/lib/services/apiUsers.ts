import axios from "axios";
import { getToken } from "../utils/manageCookie";
import { studentsSchema, teachersSchema } from "../../schemas/usersSchema";
import { z } from "zod";
import { userSchema } from "../../schemas/plainShemas";
import {
  userAddFormSchema,
  userUpdateFormSchema,
} from "../../schemas/formsSchemas";

export async function getUserByToken() {
  const token = getToken();
  if (!token) return null;

  // const date = new Date();
  // console.log(date.getHours(), date.getMinutes(), date.getSeconds());
  // console.log("Token:", token);
  // console.log("Auth Header:", `${token?.token_type} ${token?.access_token}`);

  const res = await axios
    .get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/me`, {
      headers: {
        accept: "application/json",
        Authorization: `${token?.token_type} ${token?.access_token}`,
      },
    })
    .catch(() => {
      throw new Error("Неможливо отримати дані користувача.");
    });

  // console.log(res);

  const { success, data: user } = await userSchema.safeParseAsync(res.data);
  if (!success)
    throw new Error(
      " There is an error with authentication service. Please contact administrator.",
    );

  return user;
}

export async function addUser(data: z.infer<typeof userAddFormSchema>) {
  const token = getToken();
  if (!token) throw new Error("Ви не авторизовані!");

  const res = await axios.post(
    `${import.meta.env.VITE_BASE_URL}/api/v1/auth/register`,
    data,
  );

  const { success, data: user } = await userSchema.safeParseAsync(res.data);
  if (!success)
    throw new Error(
      " There is an error with authentication service. Please contact administrator.",
    );
  return user;
}

export async function updateUser(data: z.infer<typeof userUpdateFormSchema>) {
  const token = getToken();
  if (!token) throw new Error("Ви не авторизовані!");

  const res = await axios
    .patch(`${import.meta.env.VITE_BASE_URL}/api/v1/users/me`, data, {
      headers: {
        accept: "application/json",
        Authorization: `${token?.token_type} ${token?.access_token}`,
        "Content-Type": "application/json",
      },
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Сталася помилка при Оновленні даних.");
    });

  const { success, data: user } = await userSchema.safeParseAsync(res.data);
  if (!success)
    throw new Error(
      " There is an error with authentication service. Please contact administrator.",
    );

  return user;
}

export async function getUserById(userId: number) {
  const token = getToken();
  if (!token) return null;

  const res = await axios
    .get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/${userId}`, {
      headers: {
        accept: "application/json",
        Authorization: `${token?.token_type} ${token?.access_token}`,
      },
    })
    .catch(() => {
      throw new Error("Неможливо отримати дані користувача.");
    });

  const { success, data: user } = await userSchema.safeParseAsync(res.data);
  if (!success)
    throw new Error(
      " There is an error with authentication service. Please contact administrator.",
    );

  return user;
}

export async function updateUserById(
  updateData: z.infer<typeof userAddFormSchema>,
  userId: number,
) {
  const token = getToken();
  if (!token) return null;

  const res = await axios
    .patch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/users/${userId}`,
      updateData,
      {
        headers: {
          accept: "application/json",
          Authorization: `${token?.token_type} ${token?.access_token}`,
        },
      },
    )
    .catch(() => {
      throw new Error("Неможливо отримати дані користувача.");
    });

  const { success, data: user } = await userSchema.safeParseAsync(res.data);
  if (!success)
    throw new Error(
      " There is an error with authentication service. Please contact administrator.",
    );

  return user;
}

export async function deleteUserById(userId: number) {
  const token = getToken();
  if (!token) return null;

  await axios
    .delete(`${import.meta.env.VITE_BASE_URL}/api/v1/users/${userId}`, {
      headers: {
        accept: "application/json",
        Authorization: `${token?.token_type} ${token?.access_token}`,
      },
    })
    .catch(() => {
      throw new Error("Неможливо отримати дані користувача.");
    });
}

export async function getTeachers() {
  const token = getToken();
  if (!token) throw new Error("Ви не авторизовані!");

  const res = await axios
    .get(`${import.meta.env.VITE_BASE_URL}/api/v1/teachers/`, {
      headers: {
        accept: "application/json",
        Authorization: `${token?.token_type} ${token?.access_token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Сталася помилка при отримані даних викладачів.");
    });

  const { success, data: teachers } = await teachersSchema.safeParseAsync(
    res.data,
  );
  if (!success)
    throw new Error(
      " There is an error with authentication service. Please contact administrator.",
    );

  return teachers;
}

export async function getStudents() {
  const token = getToken();
  if (!token) throw new Error("Ви не авторизовані!");

  const res = await axios
    .get(`${import.meta.env.VITE_BASE_URL}/api/v1/students/`, {
      headers: {
        accept: "application/json",
        Authorization: `${token?.token_type} ${token?.access_token}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Сталася помилка при отримані даних студентів.");
    });

  const { success, data: students } = await studentsSchema.safeParseAsync(
    res.data,
  );
  if (!success)
    throw new Error(
      " There is an error with authentication service. Please contact administrator.",
    );

  return students;
}
