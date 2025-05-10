import { ReactNode } from "react";
import Heading from "./Heading";
import usePageTitle from "../hooks/usePageTitle";

interface PageHeaderProps {
  title: string;
  children?: ReactNode;
}

function PageHeader({ title, children }: PageHeaderProps) {
  usePageTitle(title);

  return (
    <header className="grid grid-cols-[1fr_auto]">
      <Heading as="h2">{title}</Heading>
      {children}
    </header>
  );
}

export default PageHeader;
