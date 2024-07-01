import { PrismicRichText } from "@/components/PrismicRichText";

export const InfoCell = ({ info }) => {
  return (
    <PrismicRichText
      field={info}
      components={{
        paragraph: ({ children }) => (
          <p className="text-[1rem] break-words">{children}</p>
        ),
      }}
    />
  );
};
