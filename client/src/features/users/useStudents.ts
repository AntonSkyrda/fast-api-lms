import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getStudents } from "../../lib/services/apiUsers";
import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../lib/consts";

export function useStudents() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Pagination
  const page = !searchParams.get("page")
    ? 0
    : Number(searchParams.get("page")) - 1;

  const {
    isLoading,
    data: { total: totalStudents, items: students } = {},
    error: studentsError,
  } = useQuery({
    queryKey: ["students", page],
    queryFn: () => getStudents(page),
    enabled: searchParams.get("type") === "students",
    retry: false,
  });

  const pageCount = Math.ceil(totalStudents! / ITEMS_PER_PAGE) - 1;
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["courses", page + 1],
      queryFn: () => getStudents(page + 1),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["courses", page - 1],
      queryFn: () => getStudents(page - 1),
    });

  return { isLoading, totalStudents, students, studentsError };
}
