import axios from "axios";
import { getToken } from "../utils/manageCookie";
import { studentsSchema, teachersSchema } from "../../schemas/userSchema";

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
      throw new Error("Сталася помилка при отримані даних викладачів.");
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
