import { PrismicRichText } from "../PrismicRichText";
import clsx from "clsx";

export const WhiteButton = ({
  buttonText,
  setOpen,
  className,
  fullWidth = false,
}) => {
  return (
    <button
      className={clsx(
        "text-center py-3  bg-[#F1ECE5]",
        className,
        fullWidth ? "w-full" : "w-[200px]"
      )}
      onClick={() => setOpen(true)}
    >
      <PrismicRichText
        field={buttonText}
        components={{
          paragraph: ({ children }) => (
            <p className="text-black text-[16px]">{children}</p>
          ),
        }}
      />
    </button>
  );
};
