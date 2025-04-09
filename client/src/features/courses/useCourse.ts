import { useQuery } from "@tanstack/react-query";
import { getCourseById } from "../../lib/services/apiCourses";
import { useParams } from "react-router-dom";

export function useCourse() {
  const { courseId } = useParams();

  const {
    isLoading,
    data: course,
    error: courseError,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => {
      if (!courseId) return null;
      return getCourseById(courseId);
    },
    enabled: !!courseId,
    retry: false,
  });

  return { isLoading, course, courseError };
}
