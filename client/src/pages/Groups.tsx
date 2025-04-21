import AddGroup from "../features/groups/addGroup";
import GroupsList from "../features/groups/GroupsList";
import { useGroups } from "../features/groups/useGroups";
import PageHeader from "../ui/PageHeader";
import PaginationComponent from "../ui/PaginationComponent";

function Groups() {
  const { totalGroups } = useGroups();
  return (
    <div className="grid h-full grid-rows-[auto_1fr_auto] gap-10 px-10 py-4">
      <PageHeader title="Групи">
        <AddGroup />
      </PageHeader>

      <GroupsList />
      <PaginationComponent total={totalGroups} />
    </div>
  );
}

export default Groups;
