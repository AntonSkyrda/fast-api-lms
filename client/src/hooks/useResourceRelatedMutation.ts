import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useParams, useSearchParams } from "react-router-dom";

interface IUseRecourceRelatedMutation<T, D> {
  mutationFn: (id: number, vars: T) => Promise<D>;
  successMessage: string | ((data: D) => string);
  paramName: string;
}

export function useRecourceRelatedMutation<T, D>({
  mutationFn,
  successMessage,
  paramName,
}: IUseRecourceRelatedMutation<T, D>) {
  const queryClient = useQueryClient();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const resourceId = params[paramName] || searchParams.get(paramName);

  const {
    mutate: mutateFn,
    isPending,
    error,
  } = useMutation({
    mutationFn: (variables: T) => {
      if (!resourceId)
        throw new Error(
          `There is an error with this ${paramName.replace("Id", "")}`,
        );
      return mutationFn(+resourceId, variables);
    },
    onSuccess: (data) => {
      const message =
        typeof successMessage === "function"
          ? successMessage(data)
          : successMessage;

      toast.success(message);
      queryClient.invalidateQueries({
        queryKey: [paramName.replace("Id", ""), resourceId],
      });
    },
    onError: (err: Error) => {
      toast.error(err.message);
    },
  });

  return { mutate: mutateFn, isPending, error };
}
