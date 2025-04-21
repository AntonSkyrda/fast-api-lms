import { useResourcesSearch } from "../../hooks/useResourcesSearch";
import { findGroups } from "../../lib/services/apiGroups";

export function useGroupsSearch(searchStr: string) {
  const {
    isLoading,
    totalItems: totalGroups,
    items: groups,
    error: groupsError,
  } = useResourcesSearch({
    resourceName: "groups",
    fetchFn: findGroups,
    searchStr,
  });

  return { isLoading, totalGroups, groups, groupsError };
}
