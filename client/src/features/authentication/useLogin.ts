import { login as loginApi } from "../../lib/services/apiAuth";
// import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../../lib/utils/manageCookie";

export function useLogin() {
  const navigate = useNavigate();
  // const signIn = useSignIn();

  const {
    mutate: login,
    isPending,
    error: loginError,
  } = useMutation({
    mutationFn: ({
      username,
      password,
    }: {
      username: string;
      password: string;
    }) => loginApi({ username, password }),
    onSuccess: ({ token }) => {
      // const signInConfig = {
      //   auth: {
      //     token: token.access_token,
      //     type: token.token_type,
      //   },
      //   userState: {
      //     name: user.email,
      //     id: user.id,
      //   },
      // };
      // const isSignedIn = signIn(signInConfig);
      // if (!isSignedIn) {
      //   console.error("❌ Помилка збереження токена!");
      //   throw new Error(
      //     "Не вдалося зберегти токен. Перевірте `react-auth-kit`.",
      //   );
      // }
      // console.log("✅ Успішно збережено токен!");

      // queryClient.setQueryData(["user"], user);
      saveToken(token);
      navigate("/home", { replace: true });
    },
  });

  return { login, isPending, loginError };
}
