import { useResources } from "../../hooks/useResources";
import { getCourses } from "../../lib/services/apiCourses";

export function useCourses() {
  const {
    isLoading,
    totalItems: totalCourses,
    items: courses,
    error: coursesError,
  } = useResources({
    resourceName: "courses",
    fetchFn: getCourses,
  });

  return { isLoading, totalCourses, courses, coursesError };
}
