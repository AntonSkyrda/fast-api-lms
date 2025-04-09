import AccountForm from "../features/account/AccountForm";
import Heading from "../ui/Heading";

function Account() {
  return (
    <div className="flex flex-col gap-16">
      <Heading as="h2">Інформація про користувача</Heading>
      <AccountForm />
    </div>
  );
}

export default Account;
