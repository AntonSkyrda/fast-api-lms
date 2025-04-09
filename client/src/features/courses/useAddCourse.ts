import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { addCourse as addCourseApi } from "../../lib/services/apiCourses";
import toast from "react-hot-toast";
import { courseSimpleSchema } from "../../schemas/coursesSchema";

type UpdateData = z.infer<typeof courseSimpleSchema>;
export function useAddCourse() {
  const queryClient = useQueryClient();
  const {
    mutate: addCourse,
    isPending,
    error: addCourseError,
  } = useMutation({
    mutationFn: (data: UpdateData) => addCourseApi(data),
    onSuccess: (course) => {
      toast.success(`Курс ${course.name} успішно створено!`);
      queryClient.refetchQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { addCourse, isPending, addCourseError };
}
