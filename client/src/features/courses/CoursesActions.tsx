import { Button } from "../../ui/button";
import AddCourse from "./AddCourse";
import CoursesSearch from "./CoursesSearch";

function CoursesActions() {
  return (
    <div className="flex flex-row items-center gap-5">
      <CoursesSearch />
      <Button variant="outline">Сортувати</Button>
      <AddCourse />
    </div>
  );
}

export default CoursesActions;
