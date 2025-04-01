import { FallbackProps } from "react-error-boundary";
import Heading from "./Heading";
import { Button } from "./button";

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <main className="flex h-[100dvh] items-center justify-center p-20">
      <div role="alert" className="flex flex-col gap-10 p-20 text-center">
        <Heading as="h1">Щось пішло не так.💀</Heading>
        <p>Зверніться до адміністратора!</p>
        <pre className="text-red-400">{error.message}</pre>
        <Button onClick={resetErrorBoundary}>Спробуйте знову</Button>
      </div>
    </main>
  );
}

export default ErrorFallback;
