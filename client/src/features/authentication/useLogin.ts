import { login as loginApi } from "../../lib/services/apiAuth";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

// async function fetchUser(token: string) {
//   const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });
//   console.log(res);
// }

export function useLogin() {
  // const queryClient = useQueryClient();
  const navigate = useNavigate();
  const signIn = useSignIn();

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
    onSuccess: (auth) => {
      // queryClient.setQueryData(["user"], auth);
      signIn({
        auth: {
          token: auth.access_token,
          type: auth.token_type,
        },
      });
      navigate("/home", { replace: true });
    },
  });

  return { login, isPending, loginError };
}
