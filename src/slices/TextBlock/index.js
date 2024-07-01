import { PrismicRichText } from "@/components/PrismicRichText";

/**
 * @typedef {import("@prismicio/client").Content.TextBlockSlice} TextBlockSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TextBlockSlice>} TextBlockProps
 * @param {TextBlockProps}
 */
const TextBlock = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="padded-container section-y-margin"
    >
      <PrismicRichText
        field={slice.primary.text}
        components={{
          heading2: ({ children }) => (
            <h2 className="text-black mb-6 text-left text-[1.5rem]">
              {children}
            </h2>
          ),
          paragraph: ({ children }) => (
            <p className="text-left my-6">{children}</p>
          ),
        }}
      />
    </section>
  );
};

export default TextBlock;
