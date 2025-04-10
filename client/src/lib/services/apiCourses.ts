import axios from "axios";

import { courseSimpleSchema, coursesSchema } from "../../schemas/coursesSchema";
import { getToken } from "../utils/manageCookie";
import { z } from "zod";

export async function getCourses() {
  const token = getToken();
  if (!token) throw new Error("Ви не авторизовані!");

  const res = await axios
    .get(`${import.meta.env.VITE_BASE_URL}/api/v1/courses`, {
      headers: {
        accept: "application/json",
        Authorization: `${token?.token_type} ${token?.access_token}`,
      },
      withCredentials: true,
    })
    .catch(() => {
      throw new Error("Сталася помилка при отриманні курсів.");
    });

  const { success, data: courses } = await coursesSchema.safeParseAsync(
    res.data,
  );
  if (!success) throw new Error("There is Error with loading Courses data");
  return courses;
}

export async function getCourseById(id: string) {
  const token = getToken();
  if (!token) throw new Error("Ви не авторизовані!");

  const res = await axios
    .get(`${import.meta.env.VITE_BASE_URL}/api/v1/courses/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: `${token?.token_type} ${token?.access_token}`,
      },
      withCredentials: true,
    })
    .catch(() => {
      throw new Error("Такого курсу не існує!");
    });
  const { success, data: course } = await courseSimpleSchema.safeParseAsync(
    res.data,
  );
  // console.log(error);
  if (!success) throw new Error(`There is Error with loading Course data`);
  return course;
}

export async function addCourse(data: z.infer<typeof courseSimpleSchema>) {
  const token = getToken();
  if (!token) throw new Error("Ви не авторизовані!");

  const res = await axios
    .post(`${import.meta.env.VITE_BASE_URL}/api/v1/courses/`, data, {
      headers: {
        accept: "application/json",
        Authorization: `${token?.token_type} ${token?.access_token}`,
      },
      withCredentials: true,
    })
    .catch(() => {
      throw new Error("Не вдалось додати новий курс!");
    });

  const { success, data: course } = await courseSimpleSchema.safeParseAsync(
    res.data,
  );
  if (!success) throw new Error(`There is Error with loading Course data`);

  return course;
}

export async function updateCourse(
  data: z.infer<typeof courseSimpleSchema>,
  id: number,
) {
  const token = getToken();
  if (!token) throw new Error("Ви не авторизовані!");

  const res = await axios
    .patch(`${import.meta.env.VITE_BASE_URL}/api/v1/courses/${id}`, data, {
      headers: {
        accept: "application/json",
        Authorization: `${token?.token_type} ${token?.access_token}`,
      },
      withCredentials: true,
    })
    .catch(() => {
      throw new Error("Не вдалось оновити цей курс!");
    });

  const { success, data: course } = await courseSimpleSchema.safeParseAsync(
    res.data,
  );
  if (!success) throw new Error(`There is Error with loading Course data`);

  return course;
}

export async function deleteCourse(id: number) {
  const token = getToken();
  if (!token) throw new Error("Ви не авторизовані!");

  await axios
    .delete(`${import.meta.env.VITE_BASE_URL}/api/v1/courses/${id}`, {
      headers: {
        accept: "application/json",
        Authorization: `${token?.token_type} ${token?.access_token}`,
      },
      withCredentials: true,
    })
    .catch(() => {
      throw new Error("Не вдалось видалити цей курс!");
    });
}

export async function addTeacherToCourse(courseId: number, teacherId: number) {
  const token = getToken();
  if (!token) throw new Error("Ви не авторизовані!");

  const res = await axios
    .post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/courses/${courseId}/add-teacher/${teacherId}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `${token?.token_type} ${token?.access_token}`,
        },
        withCredentials: true,
      },
    )
    .catch(() => {
      throw new Error("Не вдалось додати викладача до цього курс!");
    });

  const { success, data: course } = await courseSimpleSchema.safeParseAsync(
    res.data,
  );
  if (!success) throw new Error(`There is Error with loading Course data`);

  return course;
}

export async function removeTeacherFromCourse(courseId: number) {
  const token = getToken();
  if (!token) throw new Error("Ви не авторизовані!");

  const res = await axios
    .delete(
      `${import.meta.env.VITE_BASE_URL}/api/v1/courses/${courseId}/teacher`,
      {
        headers: {
          accept: "application/json",
          Authorization: `${token?.token_type} ${token?.access_token}`,
        },
        withCredentials: true,
      },
    )
    .catch(() => {
      throw new Error("Не вдалось видалити викладача до цього курс!");
    });

  const { success, data: course } = await courseSimpleSchema.safeParseAsync(
    res.data,
  );
  if (!success) throw new Error(`There is Error with loading Course data`);

  return course;
}
