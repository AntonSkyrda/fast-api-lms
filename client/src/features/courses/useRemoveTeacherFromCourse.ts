import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeTeacherFromCourse as removeTeacherFromCourseApi } from "../../lib/services/apiCourses";
import toast from "react-hot-toast";

export function useRemoveTeacherFromCourse() {
  const queryClient = useQueryClient();

  const {
    mutate: removeTeacherFromCourse,
    isPending,
    error: removeTeacherFromCourseError,
  } = useMutation({
    mutationFn: (courseId: number) => removeTeacherFromCourseApi(courseId),
    onSuccess: () => {
      toast.success(`Викладача успішно знято з курсу!`);
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { removeTeacherFromCourse, isPending, removeTeacherFromCourseError };
}
