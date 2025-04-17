import { useCallback, useEffect, useState } from "react";
import UsersActions from "../features/users/UsersActions";
import UsersData from "../features/users/UsersData";
import { useStudents } from "../features/users/useStudents";
import { useTeachers } from "../features/users/useTeachers";
import Heading from "../ui/Heading";
import PaginationComponent from "../ui/PaginationComponent";
import { useSearchParams } from "react-router-dom";

function Users() {
  const { totalTeachers } = useTeachers();
  const { totalStudents } = useStudents();
  const [searchParams, setSearchParams] = useSearchParams();

  const [usersType, setUsersType] = useState<"teachers" | "students">(
    "teachers",
  );

  const handleUsersTypeChange = useCallback(
    function (usersType: "teachers" | "students") {
      searchParams.set("type", usersType);
      searchParams.delete("page");
      setSearchParams(searchParams);
      setUsersType(usersType);
    },
    [searchParams, setSearchParams, setUsersType],
  );

  useEffect(
    function () {
      const type = searchParams.get("type");
      if (!type) return handleUsersTypeChange("teachers");
      // if (type === "teachers" || type === "students") {
      //   handleUsersTypeChange(type);
      // }
      if (type !== usersType) {
        setUsersType(type as "teachers" | "students");
      }
    },
    [setUsersType, handleUsersTypeChange, searchParams, usersType],
  );

  const total = usersType === "teachers" ? totalTeachers : totalStudents;

  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-row items-center justify-between px-4 py-2">
        <Heading as="h2">Користувачі</Heading>
        <UsersActions />
      </header>
      <UsersData
        usersType={usersType}
        handleUsersTypeChange={handleUsersTypeChange}
      />
      <PaginationComponent total={total!} />
    </article>
  );
}

export default Users;
