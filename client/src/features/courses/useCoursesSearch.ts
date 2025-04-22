import { useResourcesSearch } from "../../hooks/useResourcesSearch";
import { findCourses } from "../../lib/services/apiCourses";

export function useCoursesSearch(searchStr: string) {
  const {
    isLoading,
    totalItems: totalCourses,
    items: courses,
    error: coursesError,
  } = useResourcesSearch({
    resourceName: "courses",
    fetchFn: findCourses,
    searchStr,
  });

  return { isLoading, totalCourses, courses, coursesError };
}
