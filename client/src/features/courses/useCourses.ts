import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../../lib/services/apiCourses";

export function useCourses() {
  const authHeader = useAuthHeader()!;

  const { isLoading, data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => getCourses(authHeader),
  });

  return { isLoading, courses };
}
