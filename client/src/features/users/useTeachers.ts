import { useQuery } from "@tanstack/react-query";
import { getTeachers } from "../../lib/services/apiUsers";

export function useTeachers() {
  const {
    isLoading,
    data: teachers,
    error: teachersError,
  } = useQuery({
    queryKey: ["teachers"],
    queryFn: getTeachers,
    retry: false,
  });

  return { isLoading, teachers, teachersError };
}
