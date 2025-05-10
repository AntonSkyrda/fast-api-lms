import CurseForm from "./CurseForm";
import { useAuth } from "../../contexts/Auth/useAuth";
import AddRecourceButton from "../../ui/AddRecourceButton";

function AddCourse() {
  const { user } = useAuth();

  if (!user?.is_superuser) return null;

  return (
    <AddRecourceButton
      triggerTitle="Додати курс"
      title="Додавання курсу"
      description="Тут ви можете додати новий курс."
    >
      <CurseForm />
    </AddRecourceButton>
  );
}

export default AddCourse;
