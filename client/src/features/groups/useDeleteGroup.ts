import { useDeleteResource } from "../../hooks/useDeleteResource";
import { deleteGroup as deleteGroupApi } from "../../lib/services/apiGroups";

export function useDeleteGroup() {
  const {
    mutate: deleteGroup,
    isPending,
    error: deleteGroupError,
  } = useDeleteResource({
    mutationFn: (groupId: number) => deleteGroupApi(groupId),
    paramName: "groups",
    successMessage: `Група була успішно видалена`,
  });

  return { deleteGroup, isPending, deleteGroupError };
}
