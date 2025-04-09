import { useQuery } from "@tanstack/react-query";
import { getCourses } from "../../lib/services/apiCourses";

export function useCourses() {
  const {
    isLoading,
    data: courses,
    error: coursesError,
  } = useQuery({
    queryKey: ["courses"],
    queryFn: getCourses,
  });

  return { isLoading, courses, coursesError };
}
