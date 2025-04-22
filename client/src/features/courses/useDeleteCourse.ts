import { useDeleteResource } from "../../hooks/useDeleteResource";
import { deleteCourse as deleteCourseApi } from "../../lib/services/apiCourses";

export function useDeleteCourse() {
  const {
    mutate: deleteCourse,
    isPending,
    error: deleteCourseError,
  } = useDeleteResource({
    mutationFn: (courseId: number) => deleteCourseApi(courseId),
    paramName: "courses",
    successMessage: `Курс була успішно видалена`,
  });

  return { deleteCourse, isPending, deleteCourseError };
}
