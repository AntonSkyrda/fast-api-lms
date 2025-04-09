import { login as loginApi } from "../../lib/services/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { saveToken } from "../../lib/utils/manageCookie";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending,
    error: loginError,
  } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),
    onSuccess: async ({ token }) => {
      saveToken(token);
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      await queryClient.refetchQueries({ queryKey: ["user"] });
      navigate("/home", { replace: true });
    },
    onError: (error) => console.log(error),
    retry: false,
  });

  return { login, isPending, loginError };
}
