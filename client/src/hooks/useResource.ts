import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface IuseResource<T> {
  resourceName: string;
  fetchFn: (id: string) => Promise<T>;
  paramName?: string;
}

export function useResource<T>({
  resourceName,
  fetchFn,
  paramName = "id",
}: IuseResource<T>) {
  const params = useParams();
  const resourceId = params[paramName];

  const {
    isLoading,
    data: resource,
    error,
  } = useQuery({
    queryKey: [resourceName, resourceId],
    queryFn: () => {
      if (!resourceId) return null;
      return fetchFn(resourceId);
    },
    enabled: !!resourceId,
    retry: false,
  });

  return { isLoading, resource, error };
}
