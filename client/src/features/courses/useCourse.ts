import { useResource } from "../../hooks/useResource";
import { getCourseById } from "../../lib/services/apiCourses";

export function useCourse() {
  const {
    isLoading,
    resource: course,
    error: courseError,
  } = useResource({
    resourceName: "course",
    fetchFn: getCourseById,
    paramName: "courseId",
  });

  return { isLoading, course, courseError };
}
