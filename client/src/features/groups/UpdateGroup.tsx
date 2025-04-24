import { useAuth } from "../../contexts/Auth/useAuth";
import UpdateRecourceButton from "../../ui/UpdateRecourceButton";
import GroupForm from "./GroupForm";
import { GroupPlain } from "../../types/dataTypes";

function UpdateGroup({ group }: { group: GroupPlain }) {
  const { user } = useAuth();

  if (!user?.is_superuser) return null;

  return (
    <UpdateRecourceButton
      triggerTitle="Редагувати групу"
      title="Оновлення інформації про групу"
      description="Тут ви можете оновити інформацію про групу"
    >
      <GroupForm groupToEdit={group} />
    </UpdateRecourceButton>
  );
}

export default UpdateGroup;
