import { useQuery } from "@tanstack/react-query";
import { getUserByToken } from "../../lib/services/apiAuth";
import { getToken } from "../../lib/utils/manageCookie";

export function useUser() {
  const token = getToken();

  const {
    data: user,
    isLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      if (!token) return null;
      return getUserByToken(token);
    },
  });

  return { user, isLoading, userError };
}
