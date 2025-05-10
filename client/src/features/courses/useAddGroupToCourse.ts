import { useRecourceRelatedMutation } from "../../hooks/useResourceRelatedMutation";
import { addGroupToCourse as addGroupToCourseApi } from "../../lib/services/apiCourses";

export function useAddGroupToCourse() {
  const {
    mutate: addGroupToCourse,
    isPending,
    error: addGroupToCourseError,
  } = useRecourceRelatedMutation({
    paramName: "courseId",
    mutationFn: (courseId, groupId: number) =>
      addGroupToCourseApi(courseId, groupId),
    successMessage: (course) => `До курсу ${course.name} успішно додано групу`,
  });

  return { addGroupToCourse, isPending, addGroupToCourseError };
}
