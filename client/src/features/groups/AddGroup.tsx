import { useAuth } from "../../contexts/Auth/useAuth";
import AddRecourceButton from "../../ui/AddRecourceButton";
import GroupForm from "./GroupForm";

function AddGroup() {
  const { user } = useAuth();

  if (!user?.is_superuser) return null;

  return (
    <AddRecourceButton
      triggerTitle="Додати групу"
      title="Додавання групи"
      description="Тут ви можете створити групу"
    >
      <GroupForm />
    </AddRecourceButton>
  );
}

export default AddGroup;
