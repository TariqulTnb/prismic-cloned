import { PrismicRichText } from "@/components/PrismicRichText";

export const LabelCell = ({ label }) => {
  return (
    <PrismicRichText
      field={label}
      components={{
        heading2: ({ children }) => <h2 className="text-[1rem]">{children}</h2>,
      }}
    />
  );
};
