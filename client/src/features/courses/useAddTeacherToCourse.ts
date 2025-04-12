import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTeacherToCourse as addTeacherToCourseApi } from "../../lib/services/apiCourses";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useAddTeacherToCourse() {
  const queryClient = useQueryClient();

  const { courseId } = useParams();

  const {
    mutate: addTeacherToCourse,
    isPending,
    error: addTeacherToCourseError,
  } = useMutation({
    mutationFn: (teacherId: number) => {
      if (!courseId) throw new Error("There is an Error with this course");
      return addTeacherToCourseApi(+courseId, teacherId);
    },
    onSuccess: (course) => {
      toast.success(
        `До курсу ${course.name} успішно додано викладача ${course.teacher?.first_name} ${course.teacher?.last_name}!`,
      );
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addTeacherToCourse, isPending, addTeacherToCourseError };
}
