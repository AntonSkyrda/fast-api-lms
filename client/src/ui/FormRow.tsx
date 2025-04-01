import {
  ComponentPropsWithoutRef,
  isValidElement,
  ReactElement,
  ReactNode,
} from "react";

interface FormRowProps {
  orientation?: "vertical" | "horizontal";
  label?: string;
  error?: string;
  children: ReactNode;
}

export default function FormRow({
  orientation = "horizontal",
  label,
  error,
  children,
}: FormRowProps) {
  const styles = `grid items-center py-5 px-0 ${orientation === "vertical" ? "grid-cols-[1fr] gap-3" : "grid-cols-[24rem_1fr_1.2fr] gap-10 divide-gray-100 has-[button]:flex has-[button]:justify-end has-[button]:gap-7"} first:pt-0 last:pb-0`;

  const childId = isValidElement(children)
    ? (children as ReactElement<ComponentPropsWithoutRef<"input">>).props.id
    : undefined;

  return (
    <div className={styles}>
      {label && childId && (
        <label htmlFor={childId} className="font-medium">
          {label}
        </label>
      )}
      {label && !childId && <span className="font-medium">{label}</span>}
      {children}
      {error && <span className="text-xl text-red-700">{error}</span>}
    </div>
  );
}
