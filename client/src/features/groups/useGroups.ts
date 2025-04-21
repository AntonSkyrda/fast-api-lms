import { useResources } from "../../hooks/useResources";
import { getGroups } from "../../lib/services/apiGroups";

export function useGroups() {
  const {
    isLoading,
    totalItems: totalGroups,
    items: groups,
    error: groupsError,
  } = useResources({
    resourceName: "groups",
    fetchFn: getGroups,
  });

  return { isLoading, totalGroups, groups, groupsError };
}
