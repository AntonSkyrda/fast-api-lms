import { z } from "zod";
import { ItemsContainer } from "../../ui/ItemsContainer";
import SearchBar from "../../ui/SearchBar";
import { useStudents } from "../users/useStudents";
import { useStudentsSearch } from "../users/useStudentsSearch";
import { groupDetailedSchema } from "../../schemas/groupsSchema";
import { useMemo } from "react";

interface StudentSearchProps {
  searchStr: string;
  isLoading: boolean;
  setSearchStr: (value: string) => void;
  handleAddStudent: (id: number) => void;
  group: z.infer<typeof groupDetailedSchema>;
}

function StudentsSearch({
  searchStr,
  isLoading,
  setSearchStr,
  handleAddStudent,
  group,
}: StudentSearchProps) {
  const studentsData = useStudentsSearch(searchStr);
  const { students, isLoading: isLoadingStudents } = useStudents();

  const availableStudents = studentsData.students.filter(
    (availableStudent) =>
      !group?.students
        .map((student) => student.id)
        .includes(availableStudent.id),
  );

  const studentsToRender = useMemo(() => {
    if (searchStr.length <= 1) return students;
    return studentsData.students.length > 0 ? availableStudents : [];
  }, [searchStr, students, studentsData.students, availableStudents]);

  const isWorking = studentsData.isLoading || isLoading || isLoadingStudents;

  return (
    <SearchBar
      value={searchStr}
      isLoading={isWorking}
      onValueChange={setSearchStr}
      isModal={true}
    >
      <SearchBar.Input placeholder="Пошук студентів" />
      <SearchBar.Content>
        <SearchBar.List
          emptyMessage={`За запитом ${searchStr} Не знайдено жодного студента`}
        >
          {studentsToRender.map((student) => (
            // <SearchBar.Result key={group.id}>
            <ItemsContainer.AvailableItem
              key={student.id}
              onAddItem={() => handleAddStudent(student.id)}
            >
              {student.last_name} {student.first_name} {student.father_name}
            </ItemsContainer.AvailableItem>
            // </SearchBar.Result>
          ))}
        </SearchBar.List>
      </SearchBar.Content>
    </SearchBar>
  );
}

export default StudentsSearch;
