import { z } from "zod";
import { useAuth } from "../../contexts/Auth/useAuth";
import UpdateRecourceButton from "../../ui/UpdateRecourceButton";
import { groupPlainSchema } from "../../schemas/plainShemas";
import GroupForm from "./GroupForm";

function UpdateGroup({ group }: { group: z.infer<typeof groupPlainSchema> }) {
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
