import { useResourcesSearch } from "../../hooks/useResourcesSearch";
import { findTeachers } from "../../lib/services/apiUsers";

export function useTeachersSearch(searchStr: string) {
  const {
    isLoading,
    totalItems: totalTeachers,
    items: teachers,
    error: teachersError,
  } = useResourcesSearch({
    resourceName: "teachers",
    fetchFn: findTeachers,
    searchStr,
  });

  return { isLoading, totalTeachers, teachers, teachersError };
}
