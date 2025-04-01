import LoginForm from "../features/authentication/LoginForm";
import usePageTitle from "../hooks/usePageTitle";
import Heading from "../ui/Heading";

export default function Login() {
  usePageTitle("Авторизація");
  return (
    <div className="grid min-h-[100dvh] grid-cols-[36rem] content-center justify-center gap-12">
      <Heading as="h2" additionalStyles="text-center">
        Виконайте авторизацію
      </Heading>
      <LoginForm />
    </div>
  );
}
