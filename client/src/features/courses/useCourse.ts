import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { useQuery } from "@tanstack/react-query";
import { getCourseById } from "../../lib/services/apiCourses";
import { useParams } from "react-router-dom";

export function useCourse() {
  const authHeader = useAuthHeader()!;
  const { courseId } = useParams();
  const {
    isLoading,
    data: course,
    error,
  } = useQuery({
    queryKey: ["course", courseId],
    queryFn: () => {
      if (!courseId) return null;
      return getCourseById(courseId, authHeader);
    },
    enabled: !!courseId,
    retry: false,
  });

  return { isLoading, course, error };
}
