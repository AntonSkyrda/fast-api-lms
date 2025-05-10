import { useAuth } from "../../contexts/Auth/useAuth";
import DeleteRecourceButton from "../../ui/DeleteRecourceButton";
import { useDeleteGroup } from "./useDeleteGroup";
import { GroupDetailed } from "../../types/dataTypes";

function DeleteGroup({ group }: { group: GroupDetailed }) {
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
