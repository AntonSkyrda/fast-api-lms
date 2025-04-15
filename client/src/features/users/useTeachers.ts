import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTeachers } from "../../lib/services/apiUsers";
import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../lib/consts";

export function useTeachers() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Pagination
  const page = !searchParams.get("page")
    ? 0
    : Number(searchParams.get("page")) - 1;

  const {
    isLoading,
    data: { total: totalTeachers, items: teachers } = {},
    error: teachersError,
  } = useQuery({
    queryKey: ["teachers", page],
    queryFn: () => getTeachers(page),
    enabled: searchParams.get("type") === "teachers",
    retry: false,
  });

  const pageCount = Math.ceil(totalTeachers! / ITEMS_PER_PAGE) - 1;
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["courses", page + 1],
      queryFn: () => getTeachers(page + 1),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["courses", page - 1],
      queryFn: () => getTeachers(page - 1),
    });

  return { isLoading, totalTeachers, teachers, teachersError };
}
