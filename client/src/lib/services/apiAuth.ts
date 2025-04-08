import axios from "axios";

import { authSchema } from "../../schemas/authSchema";
import { z } from "zod";
import { userSchema } from "../../schemas/userSchema";

type token = z.infer<typeof authSchema>;

export async function getUserByToken(token: token) {
  const res = await axios
    .get(`${import.meta.env.VITE_BASE_URL}/api/v1/users/me`, {
      headers: {
        accept: "application/json",
        Authorization: `${token.token_type} ${token.access_token}`,
      },
      withCredentials: true,
    })
    .catch(() => {
      throw new Error("Неможливо отримати дані користувача.");
    });

  const { success, data: user } = userSchema.safeParse(res.data);
  if (!success)
    throw new Error(
      " There is an error with authentication service. Please contact administrator.",
    );

  return user;
}

export async function login({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const formData = new URLSearchParams();
  formData.append("grant_type", "password");
  formData.append("username", username);
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
      throw new Error(`Невірний Username чи Пароль.`);
    });
  const { success, data: token } = authSchema.safeParse(res.data);
  if (!success)
    throw new Error(
      " There is an error with authentication service. Please contact administrator.",
    );
  return { token };
}
