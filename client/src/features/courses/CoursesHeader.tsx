import Heading from "../../ui/Heading";
import CoursesActions from "./CoursesActions";

function CoursesHeader() {
  return (
    <header className="grid grid-cols-[1fr_auto]">
      <Heading as="h2">Курси</Heading>
      <CoursesActions />
    </header>
  );
}

export default CoursesHeader;
