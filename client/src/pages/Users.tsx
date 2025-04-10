import UsersActions from "../features/users/UsersActions";
import UsersData from "../features/users/UsersData";
import Heading from "../ui/Heading";

function Users() {
  return (
    <article className="flex flex-col gap-10">
      <header className="flex flex-row items-center justify-between px-4 py-2">
        <Heading as="h2">Користувачі</Heading>
        <UsersActions />
      </header>
      <UsersData />
    </article>
  );
}

export default Users;
