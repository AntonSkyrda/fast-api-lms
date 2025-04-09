import { useQuery } from "@tanstack/react-query";
import { getUserByToken } from "../../lib/services/apiAuth";

export function useUser() {
  const {
    data: user,
    isLoading,
    error: userError,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserByToken,
  });
  console.log("user from hook", user);

  return { user, isLoading, userError };
}
