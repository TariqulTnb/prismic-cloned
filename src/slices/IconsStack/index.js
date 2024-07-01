import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@/components/PrismicRichText";
import clsx from "clsx";

/**
 * @typedef {import("@prismicio/client").Content.IconsStackSlice} IconsStackSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<IconsStackSlice>} IconsStackProps
 * @param {IconsStackProps}
 */
const IconsStack = ({ slice }) => {
  console.log("icon stack slice", slice);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="padded-container section-y-margin-xl w-full"
    >
      <div
        className={clsx(
          "icons-grid",
          slice.variation === "withStepsAndBodyText"
            ? "with-body-text"
            : "without-body-text two-cols"
        )}
      >
        {slice.items.map((item) => (
          <>
            {/* image */}
            <div className="flex justify-center mb-2">
              <PrismicNextImage field={item.image} />
            </div>
            {/* title text */}
            <div className="mt-2">
              <PrismicRichText
                field={item.text}
                components={{
                  paragraph: ({ children }) => <p className="">{children}</p>,
                  heading2: ({ children }) => (
                    <h2 className="text-center text-[22px] laptop:mt-4">
                      {children}
                    </h2>
                  ),
                }}
              />
            </div>
            {slice.variation === "withStepsAndBodyText" && (
              <div className="mt-2">
                <PrismicRichText
                  field={item.body_text}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="text-left">{children}</p>
                    ),
                  }}
                />
              </div>
            )}
          </>
        ))}
      </div>
    </section>
  );
};

export default IconsStack;
