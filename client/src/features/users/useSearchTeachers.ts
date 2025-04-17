import { useQuery } from "@tanstack/react-query";
import { getTeachers } from "../../lib/services/apiUsers";

export function useSearchTeachers(search: string) {
  const {
    isLoading,
    data: { total: totalTeachers, items: teachers } = {},
    error: teachersError,
  } = useQuery({
    queryKey: ["teachers", search],
    queryFn: () => getTeachers({ search }),
    enabled: search.length >= 3,
    retry: false,
  });

  return { isLoading, totalTeachers, teachers, teachersError };
}
