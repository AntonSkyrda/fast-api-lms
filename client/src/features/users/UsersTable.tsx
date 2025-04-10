import { useEffect } from "react";
import Spinner from "../../ui/Spinner";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useStudents } from "./useStudents";
import { useTeachers } from "./useTeachers";
import toast from "react-hot-toast";
import Empty from "../../ui/Empty";
import UsersDataActions from "./UsersDataActions";

interface UsersTableProps {
  usersType: "teachers" | "students";
}

function UsersTable({ usersType }: UsersTableProps) {
  const {
    teachers,
    teachersError,
    isLoading: isLoadingTeachers,
  } = useTeachers();
  const {
    students,
    studentsError,
    isLoading: isLoadingStudents,
  } = useStudents();

  const dataToDisplay = {
    teachers: { heading: "Викладачів", body: teachers },
    students: { heading: "Студентів", body: students },
  };

  const isLoading = isLoadingStudents || isLoadingTeachers;

  useEffect(
    function () {
      if (teachersError) toast.error(teachersError.message);
      if (studentsError) toast.error(studentsError.message);
    },
    [teachersError, studentsError],
  );

  if (isLoading) return <Spinner />;
  if (!dataToDisplay[usersType].body?.length)
    return <Empty resourceName={dataToDisplay[usersType].heading} />;
  return (
    <Table>
      <TableCaption>Список {dataToDisplay[usersType].heading}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Імʼя</TableHead>
          <TableHead>Прізвище</TableHead>
          <TableHead>По-батькові</TableHead>
          <TableHead>Контакт для звʼязку</TableHead>
          <TableHead className="text-right">Дії</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {dataToDisplay[usersType].body.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.first_name}</TableCell>
            <TableCell>{user.last_name}</TableCell>
            <TableCell>{user.father_name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell className="text-right">
              <UsersDataActions user={user} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default UsersTable;
