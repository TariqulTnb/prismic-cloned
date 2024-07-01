import { PrismicRichText } from "@/components/PrismicRichText";
import clsx from "clsx";

export const DropdownItem = ({ text, index, activeIndex, onItemSelect }) => {
  const handleClick = () => {
    onItemSelect(index);
  };
  return (
    <button
      onClick={handleClick}
      className="h-full w-full text-left p-2 cursor-pointer"
    >
      <PrismicRichText
        field={text}
        components={{
          paragraph: ({ children }) => (
            <p
              className={clsx(
                index === activeIndex ? "text-black" : "text-[#707070]",
                "font-bold"
              )}
            >
              {children}
            </p>
          ),
          heading2: ({ children }) => (
            <p
              className={clsx(
                index === activeIndex ? "text-black" : "text-[#707070]",
                "font-bold"
              )}
            >
              {children}
            </p>
          ),
        }}
      />
    </button>
  );
};
