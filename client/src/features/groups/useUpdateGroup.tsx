import { useMutation, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";
import { updateGroupPatch as updateGroupApi } from "../../lib/services/apiGroups";
import toast from "react-hot-toast";
import { groupUpdateSchemaPartial } from "../../schemas/formsSchemas";
import { useParams } from "react-router-dom";

type UpdateData = z.infer<typeof groupUpdateSchemaPartial>;
export function useUpdateGroup() {
  const queryClient = useQueryClient();
  const { groupId } = useParams();

  const {
    mutate: updateGroup,
    isPending,
    error: updateGroupError,
  } = useMutation({
    mutationFn: ({ data, id }: { data: UpdateData; id: number }) =>
      updateGroupApi(data, id),
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
