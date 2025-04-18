import { ZodSchema, z } from "zod";
import { getToken } from "../utils/manageCookie";
import axios, { AxiosRequestConfig, AxiosError } from "axios";

interface IinteractWithAPI<T extends ZodSchema, D extends object> {
  url: string;
  method: "get" | "post" | "patch" | "delete";
  methodErrorMessage?: string;
  serverErrorRecourseName?: string;
  schema: T;
  data?: D;
}

export default async function interactWithAPI<
  T extends ZodSchema,
  D extends object,
>({
  url,
  method,
  schema,
  data = {} as D,
  methodErrorMessage = "There is an error with method",
  serverErrorRecourseName = "There is Error with data. Please contact administrator",
}: IinteractWithAPI<T, D>): Promise<z.infer<T>> {
  const token = getToken();
  if (!token) throw new Error("Ви не авторизовані!");

  const config: AxiosRequestConfig = {
    headers: {
      accept: "application/json",
      Authorization: `${token?.token_type} ${token?.access_token}`,
      "Content-Type": "application/json",
    },
  };

  try {
    let res;
    if (method === "get") {
      res = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/api/v1/${url}`,
        config,
      );
    } else if (method === "post") {
      res = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/${url}`,
        data,
        config,
      );
    } else if (method === "patch") {
      res = await axios.patch(
        `${import.meta.env.VITE_BASE_URL}/api/v1/${url}`,
        data,
        config,
      );
    } else if (method === "delete") {
      res = await axios.delete(
        `${import.meta.env.VITE_BASE_URL}/api/v1/${url}`,
        config,
      );
    } else {
      throw new Error("Unsupported method");
    }

    if (method === "delete" && !res.data) {
      return undefined as z.infer<T>;
    }

    const methodStr = {
      get: "loading",
      patch: "updating",
      post: "uploading",
      delete: "deleting",
    };

    const parseResult = await schema.safeParseAsync(res.data);
    if (!parseResult.success)
      throw new Error(
        `There is Error with ${methodStr[method]} ${serverErrorRecourseName} data. Please contact administrator`,
      );

    return parseResult.data;
  } catch (error: unknown) {
    const axiosError = error as AxiosError;
    console.log(axiosError);
    throw new Error(methodErrorMessage);
  }
}
