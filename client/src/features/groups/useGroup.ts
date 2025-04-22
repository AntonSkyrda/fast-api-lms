import { useResource } from "../../hooks/useResource";
import { getGroupById } from "../../lib/services/apiGroups";

export function useGroup() {
  const {
    isLoading,
    resource: group,
    error: groupError,
  } = useResource({
    resourceName: "group",
    fetchFn: getGroupById,
    paramName: "groupId",
  });

  return { isLoading, group, groupError };
}
