import AddGroup from "../features/groups/AddGroup";
import GroupDetails from "../features/groups/GroupDetails";
import GroupsList from "../features/groups/GroupsList";
import { useGroups } from "../features/groups/useGroups";
import PageHeader from "../ui/PageHeader";
import PaginationComponent from "../ui/PaginationComponent";
import { useSearchParams } from "react-router-dom";

function Groups() {
  const { totalGroups } = useGroups();
  const [searchParams, setSearchParams] = useSearchParams();
  const activeGroup = Number(searchParams.get("groupId")) || null;

  function handleActiveGroup(groupId: number) {
    if (!groupId) return;
    if (groupId === activeGroup) {
      searchParams.delete("groupId");
      return setSearchParams(searchParams);
    }
    searchParams.set("groupId", String(groupId));
    setSearchParams(searchParams);
  }

  return (
    <article className="grid h-full grid-cols-1 grid-rows-[auto_1fr] gap-10 px-10 py-4">
      <PageHeader title="Групи">
        <AddGroup />
      </PageHeader>
      <div className="grid grid-cols-2 gap-18">
        <section>
          <GroupsList
            activeGroup={activeGroup}
            handleActiveGroup={handleActiveGroup}
          />
          <PaginationComponent total={totalGroups} />
        </section>
        <section>
          <GroupDetails />
        </section>
      </div>
    </article>
  );
}

export default Groups;
