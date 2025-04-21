import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { updateCourse as updateCourseApi } from "../../lib/services/apiCourses";
import toast from "react-hot-toast";
import { courseUpdateSchemaPartial } from "../../schemas/formsSchemas";
import { useParams } from "react-router-dom";

type UpdateData = z.infer<typeof courseUpdateSchemaPartial>;
export function useUpdateGroup() {
  const queryClient = useQueryClient();
  const { groupId } = useParams();

  const {
    mutate: updateGroup,
    isPending,
    error: updateGroupError,
  } = useMutation({
    mutationFn: ({ data, id }: { data: UpdateData; id: number }) =>
      updateCourseApi(data, id),
    onSuccess: (group) => {
      toast.success(`Групу ${group.name} успішно оновленно!`);
      if (groupId)
        queryClient.invalidateQueries({
          queryKey: ["group", groupId],
        });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { updateGroup, isPending, updateGroupError };
}
