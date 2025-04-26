import { CourseDetailed } from "../../types/dataTypes";
import CoursePrograms from "./coursePrograms";
import ProgramForm from "./ProgramForm";

interface CourseProgramsListProps {
  course: CourseDetailed;
}

function CourseProgramsList({ course }: CourseProgramsListProps) {
  return (
    <div>
      {course.programs.length > 0 ? (
        <CoursePrograms initialPrograms={course.programs} />
      ) : (
        <p>Тут ще немає жодної теми.</p>
      )}
      <ProgramForm course={course} />
    </div>
  );
}

export default CourseProgramsList;
