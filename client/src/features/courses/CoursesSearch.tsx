import { useState } from "react";
import { useCoursesSearch } from "./useCoursesSearch";
import SearchBar from "../../ui/SearchBar";
import { useNavigate } from "react-router-dom";

function CoursesSearch() {
  const navigate = useNavigate();
  const [searchStr, setSearchStr] = useState("");
  const { courses, isLoading } = useCoursesSearch(searchStr);

  return (
    <SearchBar
      value={searchStr}
      isLoading={isLoading}
      onValueChange={setSearchStr}
    >
      <SearchBar.Input placeholder="Пошук курсів" />
      <SearchBar.Content>
        <SearchBar.List
          emptyMessage={`За запитом ${searchStr} Не знайдено жодного курсу`}
        >
          {courses.map((course) => (
            <SearchBar.Result
              key={course.id}
              className="cursor-pointer"
              handleSelect={() => navigate(`/courses/${course.id}`)}
            >
              {course.name}
            </SearchBar.Result>
          ))}
        </SearchBar.List>
      </SearchBar.Content>
    </SearchBar>
  );
}

export default CoursesSearch;
