import UsersActions from "../features/users/UsersActions";
import Heading from "../ui/Heading";

function Users() {
  return (
    <article>
      <header className="flex flex-row items-center justify-between px-4 py-2">
        <Heading as="h2">Користувачі</Heading>
        <UsersActions />
      </header>
    </article>
  );
}

export default Users;
