import clsx from "clsx";

export function Bounded({
  as: Comp = "div",
  yPadding = "base",
  xPadding = "base",
  collapsible = true,
  className,
  children,
}) {
  return (
    <Comp
      data-collapsible={collapsible}
      className={clsx(
        xPadding === "none" && "px-0",
        xPadding === "xs" && "px-2",
        xPadding === "sm" && "px-4",
        xPadding === "base" && "px-6",
        xPadding === "md" && "px-8 md:px-12",
        xPadding === "lg" && "px-10 md:px-16",
        yPadding === undefined && "py-0",
        yPadding === "none" && "py-0",
        yPadding === "xxxs" && "py-1 md:py-2",
        yPadding === "xxs" && "py-2 md:py-4",
        yPadding === "xs" && "py-4 md:py-6",
        yPadding === "sm" && "py-8 md:py-10",
        yPadding === "md" && "py-10 md:py-12",
        yPadding === "lg" && "py-12 md:py-14",
        yPadding === "xl" && "py-14 md:py-16",
        yPadding === "base" && "py-20 md:py-32",
        className
      )}
    >
      <div className="mx-auto w-full h-full max-w-6xl">{children}</div>
    </Comp>
  );
}
