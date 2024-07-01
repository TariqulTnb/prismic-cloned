import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextLink } from "@prismicio/next";
import * as prismic from "@prismicio/client";
import clsx from "clsx";

export const MobileTextBox = ({ slice }) => {
  return (
    <>
      {prismic.isFilled.richText(slice.primary.centered_text) && (
        <PrismicRichText
          field={slice.primary.centered_text}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-black my-4 px-4 text-center">{children}</h2>
            ),
            paragraph: ({ children }) => (
              <p
                className={clsx(
                  slice.primary.big_paragraph_text_on_mobile
                    ? "text-[#707070] text-[20px] font-bold"
                    : "text-black",
                  "mt-4 mb-8 px-4 text-center"
                )}
              >
                {children}
              </p>
            ),
          }}
        />
      )}
      {prismic.isFilled.richText(slice.primary.text) && (
        <PrismicRichText
          field={slice.primary.text}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-black text-[19px] my-4 px-4 text-center">
                {children}
              </h2>
            ),
            heading1: ({ children }) => (
              <h1 className="text-black font-bold text-[26px] my-4 px-4 text-center">
                {children}
              </h1>
            ),
            paragraph: ({ children }) => (
              <p
                className={clsx(
                  slice.primary.big_paragraph_text_on_mobile
                    ? "text-[#707070] text-[20px] font-bold"
                    : "text-black",
                  "mt-4 mb-8 px-4 text-center"
                )}
              >
                {children}
              </p>
            ),
          }}
        />
      )}

      {slice.variation === "centeredTextWithButton" && (
        <div className="mt-0 flex justify-center">
          <PrismicNextLink field={slice.primary.button_link} className="">
            <button className="transition duration-400 ease-in-out bg-ddGreen hover:bg-ddGreenHover px-5 py-2 max-w-[243px]">
              <PrismicRichText
                field={slice.primary.button_text}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-white text-base">{children}</p>
                  ),
                }}
              />
            </button>
          </PrismicNextLink>
        </div>
      )}
    </>
  );
};
