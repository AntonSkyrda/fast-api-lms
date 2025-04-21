import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addGroupToCourse as addGroupToCourseApi } from "../../lib/services/apiCourses";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useAddGroupToCourse() {
  const queryClient = useQueryClient();

  const { courseId } = useParams();

  const {
    mutate: addGroupToCourse,
    isPending,
    error: addGroupToCourseError,
  } = useMutation({
    mutationFn: (groupId: number) => {
      if (!courseId) throw new Error("There is an Error with this course");
      return addGroupToCourseApi(+courseId, groupId);
    },
    onSuccess: (course) => {
      console.log(course);
      toast.success(`До курсу ${course.name} успішно додано групу !`);
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addGroupToCourse, isPending, addGroupToCourseError };
}
