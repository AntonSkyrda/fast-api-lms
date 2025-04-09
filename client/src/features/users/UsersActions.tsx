import AddUser from "./AddUser";

function UsersActions() {
  return (
    <div className="flex flex-row items-center gap-5">
      <span>Search</span>
      <span>Filter</span>
      <AddUser />
    </div>
  );
}

export default UsersActions;
