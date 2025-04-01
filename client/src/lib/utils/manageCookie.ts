import Cookies from "js-cookie";
import { z } from "zod";
import { authSchema } from "../../schemas/authSchema";

type token = z.infer<typeof authSchema>;
// Зберігання токена
export const saveToken = (token: token) => {
  // Встановлюємо cookie з токеном на 7 днів
  Cookies.set("_auth", token.access_token, {
    type: token.token_type,
    expires: 7,
    secure: true,
    sameSite: "strict",
  });
};

// Отримання токена
export const getToken = () => {
  return Cookies.get("_auth");
};

// Видалення токена (при виході)
export const removeToken = () => {
  Cookies.remove("_auth");
};
