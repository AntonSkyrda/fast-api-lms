import { useRecourceRelatedMutation } from "../../hooks/useResourceRelatedMutation";
import { removeGroupFromCourse as removeGroupFromCourseApi } from "../../lib/services/apiCourses";

export function useRemoveGroupFromCourse() {
  const {
    mutate: removeGroupFromCourse,
    isPending,
    error: removeGroupFromCourseError,
  } = useRecourceRelatedMutation({
    paramName: "courseId",
    mutationFn: (courseId, groupId: number) =>
      removeGroupFromCourseApi(courseId, groupId),
    successMessage: (course) => `З курсу ${course.name} успішно видалено групу`,
  });

  return { removeGroupFromCourse, isPending, removeGroupFromCourseError };
}
