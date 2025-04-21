import { useResourcesSearch } from "../../hooks/useResourcesSearch";
import { findStudents } from "../../lib/services/apiUsers";

export function useStudentsSearch(searchStr: string) {
  const {
    isLoading,
    totalItems: totalTeachers,
    items: teachers,
    error: teachersError,
  } = useResourcesSearch({
    resourceName: "students",
    fetchFn: findStudents,
    searchStr,
  });

  return { isLoading, totalTeachers, teachers, teachersError };
}
