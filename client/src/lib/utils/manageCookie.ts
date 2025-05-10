import Cookies from "js-cookie";
import { z } from "zod";
import { authSchema } from "../../schemas/authSchema";

type token = z.infer<typeof authSchema>;
export const saveToken = (token: token) => {
  Cookies.set("_auth", token.access_token, {
    type: token.token_type,
    expires: 7,
    secure: true,
    sameSite: "strict",
  });
};

type returnObjType = { access_token: string; token_type: "bearer" };
export const getToken = () => {
  const token = Cookies.get("_auth");
  if (!token) return;
  const returnObj: returnObjType = {
    access_token: token,
    token_type: "bearer",
  };
  return returnObj;
};

export const removeToken = () => {
  Cookies.remove("_auth");
};
