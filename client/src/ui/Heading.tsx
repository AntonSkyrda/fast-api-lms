import { ReactNode } from "react";
import { cn } from "../lib/utils/cn";

interface HeadingProps {
  as: "h1" | "h2" | "h3" | "h4";
  additionalStyles?: string;
  children: ReactNode;
}

export default function Heading({
  as = "h1",
  children,
  additionalStyles,
}: HeadingProps) {
  const baseStyles = "leading-[1.4]";
  const styles = {
    h1: "text-5xl font-semibold",
    h2: "text-4xl font-semibold",
    h3: "text-5xl font-medium",
    h4: "text-2xl font-semibold",
  };

  const HeadingTag = as;

  return (
    <HeadingTag className={cn(baseStyles, styles[as], additionalStyles)}>
      {children}
    </HeadingTag>
  );
}
