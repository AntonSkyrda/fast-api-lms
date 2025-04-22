import { useRecourceRelatedMutation } from "../../hooks/useResourceRelatedMutation";
import { removeStudentFromGroup as removeStudentFromGroupApi } from "../../lib/services/apiGroups";

export function useRemoveStudentFromGroup() {
  const {
    mutate: removeStudentFromGroup,
    isPending,
    error: removeStudentFromGroupError,
  } = useRecourceRelatedMutation({
    paramName: "groupId",
    mutationFn: (groupId, studentId: number) =>
      removeStudentFromGroupApi(groupId, studentId),
    successMessage: (group) =>
      `З групи ${group.name} успішно видалено студента`,
  });

  return { removeStudentFromGroup, isPending, removeStudentFromGroupError };
}
