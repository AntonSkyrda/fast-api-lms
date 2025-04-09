import Heading from "./Heading";

interface EmptyProps {
  resourceName: string;
}

function Empty({ resourceName }: EmptyProps) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <Heading as="h2">Неможливо знайти {resourceName} 🥲</Heading>
    </div>
  );
}

export default Empty;
