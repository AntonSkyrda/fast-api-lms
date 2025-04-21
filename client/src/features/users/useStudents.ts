import { useResources } from "../../hooks/useResources";
import { getStudents } from "../../lib/services/apiUsers";

export function useStudents() {
  const {
    isLoading,
    totalItems: totalStudents,
    items: students,
    error: studentsError,
  } = useResources({
    resourceName: "students",
    fetchFn: getStudents,
    enableCondition: "students",
  });

  return { isLoading, totalStudents, students, studentsError };
}
