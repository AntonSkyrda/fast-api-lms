import { useQuery } from "@tanstack/react-query";

interface IuseResourceSearch<T> {
  resourceName: string;
  fetchFn: (searchStr: string) => Promise<{ total: number; items: T[] }>;
  searchStr: string;
  minLength?: number;
}

export function useResourcesSearch<T>({
  resourceName,
  fetchFn,
  searchStr,
  minLength = 3,
}: IuseResourceSearch<T>) {
  const {
    isLoading,
    data: { total: totalItems, items } = { total: 0, items: [] },
    error,
  } = useQuery({
    queryKey: [resourceName, searchStr],
    queryFn: () => fetchFn(searchStr),
    enabled: searchStr.length >= minLength,
    retry: false,
  });

  return { isLoading, totalItems, items, error };
}
