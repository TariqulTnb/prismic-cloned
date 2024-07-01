import { PrismicRichText } from "@/components/PrismicRichText";
import clsx from "clsx";

export const TabButton = ({
  text,
  index,
  activeTabIndex,
  setActiveTabIndex,
  onItemSelect,
}) => {
  const determineOuterTabClasses = (index) => {
    return index === activeTabIndex
      ? "text-white bg-ddGreen"
      : "text-unselectedTabGray hover:text-black";
  };

  const handleClick = () => {
    setActiveTabIndex(index);
    if (onItemSelect) {
      onItemSelect(index);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={clsx(
        determineOuterTabClasses(index),
        "cursor-pointer font-semibold px-4 py-2 rounded-xs"
      )}
    >
      <PrismicRichText
        field={text}
        components={{
          paragraph: ({ children }) => <p className="text-base">{children}</p>,
          heading2: ({ children }) => <h2 className="text-base">{children}</h2>,
        }}
      />
    </button>
  );
};
