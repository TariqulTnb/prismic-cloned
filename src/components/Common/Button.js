import clsx from "clsx";
import { PrismicNextLink } from "@prismicio/next";

export const Button = ({
  link,
  children,
  outline = false,
  onClick,
  ...props
}) => {
  console.log("link in button is", link);

  if (typeof link === "string") {
    return (
      <a href={link}>
        <button
          className={clsx(
            outline
              ? "text-black"
              : " bg-ddGreen hover:bg-ddGreenHover text-white",
            "px-4 py-2 rounded-xs border border-ddGreen hover:border-ddGreenHover min-w-[159px] tablet:min-w-[13.125rem]",
            props.className
          )}
        >
          {children}
        </button>
      </a>
    );
  } else if (onClick) {
    return (
      <button
        onClick={onClick}
        className={clsx(
          outline
            ? "text-black"
            : " bg-ddGreen hover:bg-ddGreenHover text-white",
          "px-4 py-2 rounded-xs border border-ddGreen hover:border-ddGreenHover min-w-[159px] tablet:min-w-[13.125rem]",
          props.className
        )}
      >
        {children}
      </button>
    );
  } else {
    return (
      <PrismicNextLink field={link}>
        <button
          className={clsx(
            outline
              ? "text-black"
              : " bg-ddGreen hover:bg-ddGreenHover text-white",
            "px-4 py-2 rounded-xs border border-ddGreen hover:border-ddGreenHover min-w-[159px] tablet:min-w-[13.125rem]",
            props.className
          )}
        >
          {children}
        </button>
      </PrismicNextLink>
    );
  }
};
