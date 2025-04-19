import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { ITEMS_PER_PAGE } from "../lib/consts";

interface IuseRecources<T> {
  resourceName: string;
  fetchFn: (page: number) => Promise<{ total: number; items: T[] }>;
  enableCondition?: boolean | string | null;
  queryParams?: Record<string, unknown>;
}

export function useResources<T>({
  resourceName,
  fetchFn,
  enableCondition,
  queryParams = {},
}: IuseRecources<T>) {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get("page")
    ? 0
    : Number(searchParams.get("page")) - 1;

  const {
    isLoading,
    data: { total: totalItems, items } = { total: 0, items: [] },
    error,
  } = useQuery({
    queryKey: [resourceName, page, ...Object.values(queryParams)],
    queryFn: () => fetchFn(page),
    enabled:
      typeof enableCondition === "string"
        ? searchParams.get("type") === enableCondition
        : enableCondition !== false,
    retry: false,
  });

  const pageCount = Math.ceil(totalItems! / ITEMS_PER_PAGE) - 1;
  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: [resourceName, page + 1, ...Object.values(queryParams)],
      queryFn: () => fetchFn(page + 1),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: [resourceName, page - 1, ...Object.values(queryParams)],
      queryFn: () => fetchFn(page - 1),
    });

  return { isLoading, totalItems, items, error };
}
