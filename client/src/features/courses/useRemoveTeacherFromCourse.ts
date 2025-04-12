import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeTeacherFromCourse as removeTeacherFromCourseApi } from "../../lib/services/apiCourses";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useRemoveTeacherFromCourse() {
  const queryClient = useQueryClient();
  const { courseId } = useParams();

  const {
    mutate: removeTeacherFromCourse,
    isPending,
    error: removeTeacherFromCourseError,
  } = useMutation({
    mutationFn: () => {
      if (!courseId) throw new Error("There is an error wirh course");
      return removeTeacherFromCourseApi(+courseId);
    },
    onSuccess: () => {
      toast.success(`Викладача успішно знято з курсу!`);
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { removeTeacherFromCourse, isPending, removeTeacherFromCourseError };
}
