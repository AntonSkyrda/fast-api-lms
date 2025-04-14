import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { updateCourse as updateCourseApi } from "../../lib/services/apiCourses";
import toast from "react-hot-toast";
import { courseAddAndUpdateFormSchema } from "../../schemas/formsSchemas";
import { useParams } from "react-router-dom";

type UpdateData = z.infer<typeof courseAddAndUpdateFormSchema>;
export function useUpdateCourse() {
  const queryClient = useQueryClient();
  const { courseId } = useParams();

  const {
    mutate: updateCourse,
    isPending,
    error: updateCourseError,
  } = useMutation({
    mutationFn: ({ data, id }: { data: UpdateData; id: number }) =>
      updateCourseApi(data, id),
    onSuccess: (course) => {
      toast.success(`Курс ${course.name} успішно оновленно!`);
      // Promise.all([
      //   queryClient.invalidateQueries({
      //     queryKey: ["course", course.id],
      //   }),
      //   queryClient.invalidateQueries({ queryKey: ["courses"] }),
      // ]);
      if (courseId)
        queryClient.invalidateQueries({
          queryKey: ["course", courseId],
        });
      queryClient.invalidateQueries({ queryKey: ["courses"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateCourse, isPending, updateCourseError };
}
