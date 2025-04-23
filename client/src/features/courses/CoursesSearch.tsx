import { useMemo, useState } from "react";
import { useCourses } from "./useCourses";
import { useCoursesSearch } from "./useCoursesSearch";
import SearchBar from "../../ui/SearchBar";
import { useNavigate } from "react-router-dom";

function CoursesSearch() {
  const navigate = useNavigate();
  const [searchStr, setSearchStr] = useState("");
  const { courses, isLoading } = useCourses();
  const coursesSearchData = useCoursesSearch(searchStr);

  const coursesToRender = useMemo(() => {
    if (searchStr.length <= 1) return courses;
    return coursesSearchData.courses.length > 0
      ? coursesSearchData.courses
      : [];
  }, [searchStr, courses, coursesSearchData.courses]);

  const isWorking = isLoading || coursesSearchData.isLoading;

  return (
    <SearchBar
      value={searchStr}
      isLoading={isWorking}
      onValueChange={setSearchStr}
    >
      <SearchBar.Input placeholder="Пошук курсів" />
      <SearchBar.Content>
        <SearchBar.List
          emptyMessage={`За запитом ${searchStr} Не знайдено жодного курсу`}
        >
          {coursesToRender.map((course) => (
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
