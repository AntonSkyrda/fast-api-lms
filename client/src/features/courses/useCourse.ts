import { useQuery } from "@tanstack/react-query";
import { getCourseById } from "../../lib/services/apiCourses";
import { useParams } from "react-router-dom";
import { getToken } from "../../lib/utils/manageCookie";

export function useCourse() {
  const token = getToken()!;
  const { courseId } = useParams();
  const {
    isLoading,
    data: course,
    error,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => {
      if (!courseId || token) return null;
      return getCourseById(courseId, token);
    },
    enabled: !!courseId,
    retry: false,
  });

  return { isLoading, course, error };
}
