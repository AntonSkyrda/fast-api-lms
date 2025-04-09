import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { updateCourse as updateCourseApi } from "../../lib/services/apiCourses";
import toast from "react-hot-toast";
import { courseSimpleSchema } from "../../schemas/coursesSchema";

type UpdateData = z.infer<typeof courseSimpleSchema>;
export function useUpdateCourse() {
  const queryClient = useQueryClient();

  const {
    mutate: updateCourse,
    isPending,
    error: updateCourseError,
  } = useMutation({
    mutationFn: ({ data, id }: { data: UpdateData; id: number }) =>
      updateCourseApi(data, id),
    onSuccess: (course) => {
      toast.success(`Курс ${course.name} успішно оновленно!`);
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateCourse, isPending, updateCourseError };
}
