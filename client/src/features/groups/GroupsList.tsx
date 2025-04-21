import Empty from "../../ui/Empty";
import Spinner from "../../ui/Spinner";
import { useGroups } from "./useGroups";

function GroupsList() {
  const { groups, isLoading } = useGroups();
  if (!groups) return <Empty resourceName="Груп" />;

  if (isLoading) return <Spinner />;

  return (
    <ul className="flex flex-col gap-5">
      {groups.map((group) => (
        <li key={group.id}>
          {group.name} {group.year_of_study}
        </li>
      ))}
    </ul>
  );
}

export default GroupsList;
