import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCourse as deleteCourseApi } from "../../lib/services/apiCourses";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useDeleteCourse() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: deleteCourse,
    isPending,
    error: deleteCourseError,
  } = useMutation({
    mutationFn: (id: number) => deleteCourseApi(id),
    onSuccess: () => {
      toast.success(`Курс успішно видалено!`);
      queryClient.invalidateQueries({ queryKey: ["courses"] });
      navigate("/courses");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { deleteCourse, isPending, deleteCourseError };
}
