import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeGroupFromCourse as removeGroupFromCourseApi } from "../../lib/services/apiCourses";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";

export function useRemoveGroupFromCourse() {
  const queryClient = useQueryClient();
  const { courseId } = useParams();

  const {
    mutate: removeGroupFromCourse,
    isPending,
    error: removeGroupFromCourseError,
  } = useMutation({
    mutationFn: (groupId: number) => {
      if (!courseId) throw new Error("There is an error wirh course");
      return removeGroupFromCourseApi(+courseId, groupId);
    },
    onSuccess: () => {
      toast.success(`Групу успішно знято з курсу!`);
      queryClient.invalidateQueries({ queryKey: ["course", courseId] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { removeGroupFromCourse, isPending, removeGroupFromCourseError };
}
