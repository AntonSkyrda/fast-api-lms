import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourse as deleteCourseApi } from "../../lib/services/apiCourses";
import toast from "react-hot-toast";

export function useDeleteCourse() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteCourse,
    isPending,
    error: deleteCourseError,
  } = useMutation({
    mutationFn: (id: number) => deleteCourseApi(id),
    onSuccess: () => {
      toast.success(`Курс успішно видалено!`);
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteCourse, isPending, deleteCourseError };
}
