import { z } from "zod";
import { cn } from "../../lib/utils/cn";
import { teacherArraySchema } from "../../schemas/usersSchema";
import { Button, buttonVariants } from "../../ui/button";
import Search from "../../ui/Search";
import SearchResults from "../../ui/SearchResults";

interface ITeacherSearch {
  searchStr: string;
  handleSearch: (value: string) => void;
  isLoading: boolean;
  teachersData: {
    total?: number;
    teachers?: z.infer<typeof teacherArraySchema>;
  };
  handleSubmit: (teacherId: number) => void;
}

export function TeachersSearch({
  searchStr,
  handleSearch,
  isLoading,
  teachersData,
  handleSubmit,
}: ITeacherSearch) {
  return (
    <div className="space-y-8">
      <Search
        searchStr={searchStr}
        onSearchChange={handleSearch}
        isLoading={isLoading}
      />
      <SearchResults
        searchStr={searchStr}
        isLoading={isLoading}
        resultsLength={teachersData.teachers?.length}
        recourseName="Викладачів"
      >
        {teachersData.teachers?.map((teacher) => (
          <li
            key={teacher.id}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "flex flex-row items-center justify-between py-4",
            )}
          >
            <p>
              {teacher.last_name} {teacher.first_name} {teacher.father_name}
            </p>
            <Button
              onClick={() => handleSubmit(teacher.id)}
              disabled={isLoading}
              variant="secondary"
            >
              Додати
            </Button>
          </li>
        ))}
      </SearchResults>
    </div>
  );
}

export default TeachersSearch;
