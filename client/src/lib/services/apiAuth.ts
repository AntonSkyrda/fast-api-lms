import axios from "axios";
import { authSchema } from "../../schemas/authSchema";
import { getToken } from "../utils/manageCookie";
import { z } from "zod";
import { userSchema } from "../../schemas/userSchema";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("username", email);
  formData.append("password", password);
  formData.append("scope", "");
  formData.append("client_id", "string");
  formData.append("client_secret", "string");

  const res = await axios
    .post(`${import.meta.env.VITE_BASE_URL}/api/v1/auth/login`, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Accept: "application/json",
      },
      withCredentials: true,
    })
    .catch(() => {
      throw new Error(`Невірний Email чи Пароль.`);
    });
  const { success, data: token } = await authSchema.safeParseAsync(res.data);
  if (!success)
    throw new Error(
      " There is an error with authentication service. Please contact administrator.",
    );
  return { token };
}

export async function logout() {
  const token = getToken();
  if (!token) throw new Error("Ви не авторизовані!");

  await axios
    .post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/auth/logout`,
      {},
      {
        headers: {
          accept: "application/json",
          Authorization: `${token?.token_type} ${token?.access_token}`,
        },
        withCredentials: true,
      },
    )
    .catch(() => {
      throw new Error("Сталася помилка при Log out.");
    });
}

export async function addUser(data: z.infer<typeof userSchema>) {
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
