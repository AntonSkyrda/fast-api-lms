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
    enableCondition: "teachers",
  });

  return { isLoading, totalTeachers, teachers, teachersError };
}
