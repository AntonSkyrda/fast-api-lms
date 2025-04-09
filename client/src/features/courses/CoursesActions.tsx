import { Button } from "../../ui/Button";
import AddCourse from "./AddCourse";

function CoursesActions() {
  return (
    <div className="flex flex-row items-center gap-5">
      <span>Пошук</span>
      <Button variant="outline">Сортувати</Button>
      <AddCourse />
    </div>
  );
}

export default CoursesActions;
