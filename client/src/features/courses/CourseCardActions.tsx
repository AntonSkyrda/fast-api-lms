import { Button } from "../../ui/button";

function CourseCardActions() {
  return (
    <div className="flex flex-col gap-5">
      <Button variant="outline">Редагувати</Button>
      <Button variant="outline">Розклад</Button>
    </div>
  );
}

export default CourseCardActions;
