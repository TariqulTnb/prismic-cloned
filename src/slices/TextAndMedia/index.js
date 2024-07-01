import { PrismicRichText } from "@/components/PrismicRichText";
import clsx from "clsx";
import { PrismicNextImage } from "@prismicio/next";
import { useResponsive } from "@/hooks/useResponsive";
import { Button } from "@/components/Common/Button";

/**
 * @typedef {import("@prismicio/client").Content.TextAndMediaSlice} TextAndMediaSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TextAndMediaSlice>} TextAndMediaProps
 * @param {TextAndMediaProps}
 */
const TextAndMedia = ({ slice }) => {
  console.log("text and media", slice);
  const { isMobileSize } = useResponsive();

  console.log("button link", slice);

  const renderText = () => {
    return (
      <div className="flex-1">
        <PrismicRichText
          field={slice.primary.main_text}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-black mb-6 text-left text-[1.5rem] font-bold">
                {children}
              </h2>
            ),
            paragraph: ({ children }) => (
              <p className="text-left">{children}</p>
            ),
          }}
        />

        {/* for two column variation */}
        {slice.variation == "textLeftTwoColumnNoButton" && (
          <div className="company-info-grid">
            {slice.items.map((item) => {
              return (
                <>
                  <PrismicRichText
                    field={item.title}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="text-black font-bold">{children}</p>
                      ),
                    }}
                  />
                  <PrismicRichText
                    field={item.info}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="text-black">{children}</p>
                      ),
                    }}
                  />
                </>
              );
            })}
          </div>
        )}

        {!slice.variation.includes("NoButton") && (
          <Button link={slice.primary.button_link} className="mt-8">
            <PrismicRichText
              field={slice.primary.button_text}
              components={{
                paragraph: ({ children }) => <p className="">{children}</p>,
              }}
            />
          </Button>
        )}
      </div>
    );
  };

  const renderImage = (imageRight = true) => {
    return (
      <div
        className={clsx(
          imageRight && slice.variation.includes("textLeft")
            ? "justify-center tablet:justify-end"
            : "justify-center tablet:justify-start",
          "flex-1 flex"
        )}
      >
        <PrismicNextImage className="" field={slice.primary.image} />
      </div>
    );
  };

  return (
    <section
      className="padded-container section-y-margin-xl flex flex-col tablet:items-center tablet:flex-row tablet:justify-between gap-y-4 gap-x-12 laptop:gap-20"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id={slice.primary?.anchor_link}
    >
      {slice.variation.includes("textLeft") && !isMobileSize() && renderText()}
      {slice.variation.includes("textLeft") && renderImage(true)}
      {slice.variation.includes("textLeft") && isMobileSize() && renderText()}

      {slice.variation.includes("textRight") && renderImage(false)}
      {slice.variation.includes("textRight") && renderText()}

      {/* <div
        className={clsx(
          slice.variation === "textRightWithButton"
            ? "tablet:justify-start"
            : " tablet:order-last tablet:justify-end",
          "flex-1 flex justify-center  order-first"
        )}
      > */}
      {/* </div> */}
    </section>
  );
};

export default TextAndMedia;
