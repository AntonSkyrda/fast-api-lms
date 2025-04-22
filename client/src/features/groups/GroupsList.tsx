import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { useGroups } from "./useGroups";

interface GroupsListProps {
  activeGroup: number | null;
  handleActiveGroup: (groupId: number) => void;
}

function GroupsList({ activeGroup, handleActiveGroup }: GroupsListProps) {
  const { groups, isLoading } = useGroups();
  if (!groups) return <Empty resourceName="Груп" />;

  if (isLoading) return <Spinner />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Назва</TableHead>
          <TableHead className="w-24">Рік навчання</TableHead>
          <TableHead className="w-24 text-end">Деталі</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {groups.length ? (
          groups.map((group) => (
            <TableRow key={group.id}>
              <TableCell>{group.name}</TableCell>
              <TableCell>{group.year_of_study}</TableCell>
              <TableCell
                className="justify-items-end"
                onClick={() => handleActiveGroup(group.id)}
              >
                {activeGroup === group.id ? (
                  <ChevronLeftCircle />
                ) : (
                  <ChevronRightCircle />
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <p>Жодної групи</p>
        )}
      </TableBody>
    </Table>
  );
}

export default GroupsList;
