import { useRecourceRelatedMutation } from "../../hooks/useResourceRelatedMutation";
import { addTeacherToCourse as addTeacherToCourseApi } from "../../lib/services/apiCourses";

export function useAddTeacherToCourse() {
  const {
    mutate: addTeacherToCourse,
    isPending,
    error: addTeacherToCourseError,
  } = useRecourceRelatedMutation({
    paramName: "courseId",
    mutationFn: (courseId, teacherId: number) =>
      addTeacherToCourseApi(courseId, teacherId),
    successMessage: (course) =>
      `До курсу ${course.name} успішно додано студента`,
  });

  return { addTeacherToCourse, isPending, addTeacherToCourseError };
}
