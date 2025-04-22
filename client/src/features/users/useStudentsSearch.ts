import { useResourcesSearch } from "../../hooks/useResourcesSearch";
import { findStudents } from "../../lib/services/apiUsers";

export function useStudentsSearch(searchStr: string) {
  const {
    isLoading,
    totalItems: totalStudents,
    items: students,
    error: studentsError,
  } = useResourcesSearch({
    resourceName: "students",
    fetchFn: findStudents,
    searchStr,
  });

  return { isLoading, totalStudents, students, studentsError };
}
