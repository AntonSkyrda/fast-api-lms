import { useRecourceRelatedMutation } from "../../hooks/useResourceRelatedMutation";
import { addStudentToGroup as addStudentToGroupApi } from "../../lib/services/apiGroups";

export function useAddStudentToGroup() {
  const {
    mutate: addStudentToGroup,
    isPending,
    error: addStudentToGroupError,
  } = useRecourceRelatedMutation({
    paramName: "groupId",
    mutationFn: (groupId, studentId: number) =>
      addStudentToGroupApi(groupId, studentId),
    successMessage: (group) => `До групи ${group.name} успішно додано студента`,
  });

  return { addStudentToGroup, isPending, addStudentToGroupError };
}
