import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTeacherToCourse as addTeacherToCourseApi } from "../../lib/services/apiCourses";
import toast from "react-hot-toast";

export function useAddTeacherToCourse() {
  const queryClient = useQueryClient();

  const {
    mutate: addTeacherToCourse,
    isPending,
    error: addTeacherToCourseError,
  } = useMutation({
    mutationFn: ({
      courseId,
      teacherId,
    }: {
      courseId: number;
      teacherId: number;
    }) => addTeacherToCourseApi(courseId, teacherId),
    onSuccess: (course) => {
      toast.success(
        `До курсу ${course.name} успішно додано викладача ${course.teacher?.first_name} ${course.teacher?.last_name}!`,
      );
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addTeacherToCourse, isPending, addTeacherToCourseError };
}
