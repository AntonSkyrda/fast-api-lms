import { useMemo } from "react";
import { useTeachersSearch } from "./useTeachersSearch";
import SearchBar from "../../ui/SearchBar";
import { useTeachers } from "./useTeachers";

interface TeacherSearchProps {
  searchStr: string;
  handleSearch: (value: string) => void;
  isLoading: boolean;
  handleSubmit: (teacherId: number) => void;
}

export function TeachersSearch({
  handleSearch,
  searchStr,
  isLoading,
  handleSubmit,
}: TeacherSearchProps) {
  const { teachers, isLoading: isLoadingTeachers } = useTeachers();
  const teachersData = useTeachersSearch(searchStr);

  const teachersToRender = useMemo(() => {
    if (searchStr.length <= 1) return teachers;
    return teachersData.teachers.length > 0 ? teachersData.teachers : [];
  }, [searchStr, teachers, teachersData.teachers]);

  const isWorking = isLoading || teachersData.isLoading || isLoadingTeachers;

  return (
    <SearchBar
      value={searchStr}
      onValueChange={handleSearch}
      isModal={true}
      isLoading={isWorking}
    >
      <SearchBar.Input placeholder="Пошук викладача" />
      <SearchBar.Content>
        <SearchBar.List>
          {teachersToRender.map((teacher) => (
            <SearchBar.Result
              key={teacher.id}
              handleSelect={() => handleSubmit(teacher.id)}
            >
              {teacher.last_name} {teacher.first_name} {teacher.father_name}
            </SearchBar.Result>
          ))}
        </SearchBar.List>
      </SearchBar.Content>
    </SearchBar>
  );
}

export default TeachersSearch;
