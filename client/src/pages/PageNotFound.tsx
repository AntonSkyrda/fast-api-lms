import { NavLink } from "react-router-dom";
import { useMoveBack } from "../hooks/useMoveBack";
import { Button, buttonVariants } from "../ui/button";
import Heading from "../ui/Heading";

export default function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <main className="flex h-[100dvh] items-center justify-center p-20">
      <div className="flex flex-col gap-10 p-20 text-center">
        <Heading as="h1">Такої сторінки не існує</Heading>
        <div className="flex flex-row items-center justify-center gap-5">
          <Button variant="outline" onClick={moveBack}>
            &larr; Назад
          </Button>
          <NavLink
            className={() => buttonVariants({ variant: "default" })}
            to="/"
          >
            На головну
          </NavLink>
        </div>
      </div>
    </main>
  );
}
