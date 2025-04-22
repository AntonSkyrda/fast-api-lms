import { z } from "zod";
import { useAuth } from "../../contexts/Auth/useAuth";
import DeleteRecourceButton from "../../ui/DeleteRecourceButton";
import { groupDetailedSchema } from "../../schemas/groupsSchema";
import { useDeleteGroup } from "./useDeleteGroup";

function DeleteGroup({
  group,
}: {
  group: z.infer<typeof groupDetailedSchema>;
}) {
  const { deleteGroup, isPending } = useDeleteGroup();
  const { user } = useAuth();

  if (!user?.is_superuser) return null;

  return (
    <DeleteRecourceButton
      tiggerTitle="Видалити групу"
      title={`Ви точно хочете видалити групу ${group.name}`}
      onDelete={() => deleteGroup(group.id)}
      isLoading={isPending}
    />
  );
}

export default DeleteGroup;
