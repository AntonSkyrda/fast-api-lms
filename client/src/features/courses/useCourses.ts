import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getCourses } from "../../lib/services/apiCourses";
import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../../lib/consts";

export function useCourses() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  // Pagination
  const page = !searchParams.get("page")
    ? 0
    : Number(searchParams.get("page")) - 1;

  const {
    isLoading,
    data: { total: totalCourses, items: courses } = {},
    error: coursesError,
  } = useQuery({
    queryKey: ["courses", page],
    queryFn: () => getCourses(page),
  });

  const pageCount = Math.ceil(totalCourses! / ITEMS_PER_PAGE) - 1;
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["courses", page + 1],
      queryFn: () => getCourses(page + 1),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["courses", page - 1],
      queryFn: () => getCourses(page - 1),
    });

  console.log("page:", page, "pages:", pageCount);

  return { isLoading, totalCourses, courses, coursesError };
}
