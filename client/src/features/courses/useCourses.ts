import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../../lib/services/apiCourses";
import { getToken } from "../../lib/utils/manageCookie";

export function useCourses() {
  const token = getToken()!;

  const { isLoading, data: courses } = useQuery({
    queryKey: ["courses"],
    queryFn: () => {
      if (!token) return null;
      getCourses(token.toString());
    },
  });

  return { isLoading, courses };
}
