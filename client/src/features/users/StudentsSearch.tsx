import SearchBar from "../../ui/SearchBar";
import { useStudentsSearch } from "./useStudentsSearch";
import { GroupDetailed } from "../../types/dataTypes";
import { useItemsContainer } from "../../contexts/ItemsContainer/ItemsContainerProvider";

interface StudentSearchProps {
  searchStr: string;
  isLoading: boolean;
  setSearchStr: (value: string) => void;
  handleAddStudent: (id: number) => void;
  group: GroupDetailed;
}

function StudentsSearch({
  searchStr,
  isLoading,
  setSearchStr,
  handleAddStudent,
  group,
}: StudentSearchProps) {
  const { setIsDialogOpen } = useItemsContainer();
  const { students, isLoading: isLoadingStudents } =
    useStudentsSearch(searchStr);

  const availableStudents = students.filter(
    (availableStudent) =>
      !group?.students
        .map((student) => student.id)
        .includes(availableStudent.id),
  );

  const isWorking = isLoadingStudents || isLoading;

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
          {availableStudents.map((student) => (
            <SearchBar.Result
              key={student.id}
              handleSelect={() => {
                setIsDialogOpen(false);
                handleAddStudent(student.id);
              }}
            >
              {student.last_name} {student.first_name} {student.father_name}
            </SearchBar.Result>
          ))}
        </SearchBar.List>
      </SearchBar.Content>
    </SearchBar>
  );
}

export default StudentsSearch;
