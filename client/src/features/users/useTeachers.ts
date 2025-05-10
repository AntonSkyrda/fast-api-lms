import { useResources } from "../../hooks/useResources";
import { getTeachers } from "../../lib/services/apiUsers";

export function useTeachers() {
  const {
    isLoading,
    totalItems: totalTeachers,
    items: teachers,
    error: teachersError,
  } = useResources({
    resourceName: "teachers",
    fetchFn: getTeachers,
  });

  return { isLoading, totalTeachers, teachers, teachersError };
}
