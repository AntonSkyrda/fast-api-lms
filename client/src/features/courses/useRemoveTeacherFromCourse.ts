import { useRecourceRelatedMutation } from "../../hooks/useResourceRelatedMutation";
import { removeTeacherFromCourse as removeTeacherFromCourseApi } from "../../lib/services/apiCourses";

export function useRemoveTeacherFromCourse() {
  const {
    mutate: removeTeacherFromCourse,
    isPending,
    error: removeTeacherFromCourseError,
  } = useRecourceRelatedMutation({
    paramName: "courseId",
    mutationFn: removeTeacherFromCourseApi,
    successMessage: (course) =>
      `З групи ${course.name} успішно видалено викладача`,
  });

  return { removeTeacherFromCourse, isPending, removeTeacherFromCourseError };
}
