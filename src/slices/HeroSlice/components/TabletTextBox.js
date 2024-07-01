import { PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { PrismicRichText } from "@/components/PrismicRichText";
import * as prismic from "@prismicio/client";

const raiseTextFromBottom = ({ slice }) => {
  if (slice.variation === "centerTextOverlappingVideo") {
    return "bottom-28";
  } else if (slice.variation === "centerTextWithMenu") {
    return "bottom-16";
  } else {
    return "laptop:bottom-10 tablet:bottom-5 bottom-2";
  }
};

export const TabletTextBox = ({ slice }) => {
  return (
    <div
      className={clsx(
        raiseTextFromBottom({ slice }),
        "absolute inset-x-0 text-white py-5 padded-container"
      )}
    >
      {prismic.isFilled.richText(slice.primary.centered_text) && (
        <div className="max-w-[820px] mx-auto">
          <PrismicRichText
            field={slice.primary.centered_text}
            components={{
              heading2: ({ children }) => (
                <h2 className="text-white text-center">{children}</h2>
              ),
              paragraph: ({ children }) => (
                <p className="text-white text-center mt-2">{children}</p>
              ),
            }}
          />
        </div>
      )}

      {prismic.isFilled.richText(slice.primary.text) && (
        <div className="max-w-[820px]">
          <PrismicRichText
            field={slice.primary.text}
            components={{
              heading2: ({ children }) => (
                <h2 className="text-white font-normal">{children}</h2>
              ),
              paragraph: ({ children }) => (
                <p className="text-white text-center mt-2">{children}</p>
              ),
            }}
          />
        </div>
      )}
      {prismic.isFilled.richText(slice.primary.side_title) && (
        <div className="max-w-5xl">
          <PrismicRichText
            field={slice.primary.side_title}
            components={{
              heading2: ({ children }) => (
                <h2 className="text-white hidden tablet:block font-normal text-[1.rem] tablet:text-[2.4rem] laptop:text-[2.4rem] leading-tight desktop:text-[2.8125rem] text-left">
                  {children}
                </h2>
              ),
              paragraph: ({ children }) => (
                <p className="text-white">{children}</p>
              ),
            }}
          />
        </div>
      )}
      {prismic.isFilled.richText(slice.primary.side_title_mobile) && (
        <div className="max-w-5xl">
          <PrismicRichText
            field={slice.primary.side_title_mobile}
            components={{
              heading2: ({ children }) => (
                <h2 className="text-white font-normal block tablet:hidden text-[2.2rem] leading-tight desktop:text-[2.8125rem] text-left">
                  {children}
                </h2>
              ),
              paragraph: ({ children }) => (
                <p className="text-white block tablet:hidden">{children}</p>
              ),
            }}
          />
        </div>
      )}
      {slice.variation === "centeredTextWithButton" && (
        <div className="mt-6 flex justify-center">
          <PrismicNextLink field={slice.primary.button_link} className="">
            <button className="transition duration-400 ease-in-out bg-ddGreen hover:bg-ddGreenHover px-5 py-2">
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
    </div>
  );
};
