import { PrismicRichText } from "@/components/PrismicRichText";
import { Button } from "@/components/Common/Button";
import clsx from "clsx";
/**
 * @typedef {import("@prismicio/client").Content.TitleBlockSlice} TitleBlockSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TitleBlockSlice>} TitleBlockProps
 * @param {TitleBlockProps}
 */
const TitleBlock = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        slice.primary.has_margin ? "section-y-margin-xl" : "",
        "padded-container flex justify-center"
      )}
      id={slice.primary?.anchor_link}
    >
      {slice.primary.text && (
        <div className="max-w-2xl">
          <PrismicRichText
            field={slice.primary.text}
            components={{
              heading2: ({ children }) => (
                <h2 className=" text-black text-center">{children}</h2>
              ),
              paragraph: ({ children }) => (
                <p className="text-center mt-10">{children}</p>
              ),
            }}
          />
          {slice.variation.includes("Button") && (
            <div className="mt-6 w-full flex justify-center">
              <Button link={slice.primary.button_link}>
                <PrismicRichText
                  field={slice.primary.button_text}
                  components={{
                    paragraph: ({ children }) => <p className="">{children}</p>,
                  }}
                />
              </Button>
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default TitleBlock;
