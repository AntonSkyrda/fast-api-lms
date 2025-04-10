import { useQuery } from "@tanstack/react-query";
import { getStudents } from "../../lib/services/apiUsers";

export function useStudents() {
  const {
    isLoading,
    data: students,
    error: studentsError,
  } = useQuery({
    queryKey: ["students"],
    queryFn: getStudents,
    retry: false,
  });

  return { isLoading, students, studentsError };
}
