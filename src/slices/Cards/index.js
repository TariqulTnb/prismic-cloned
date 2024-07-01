import { PrismicNextImage } from "@prismicio/next";

import { PrismicRichText } from "@/components/PrismicRichText";
import * as prismic from "@prismicio/client";
/**
 * @typedef {import("@prismicio/client").Content.CardSlice} CardSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CardSlice>} CardProps
 * @param {CardProps}
 */
const Card = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <div className="padded-container mt-10 laptop:mt-24 flex flex-col tablet:flex-row tablet:justify-between gap-8 laptop:gap-20">
        {prismic.isFilled.group(slice.items) &&
          slice.items.map((item, index) => {
            return (
              <div key={index} className="flex-1">
                <div className="flex-1 flex justify-center">
                  <PrismicNextImage className="" field={item.card_image} />
                </div>
                <PrismicRichText
                  field={item.card_text}
                  components={{
                    heading2: ({ children }) => (
                      <h2 className="text-black my-6 text-left laptop:text-center card-title">
                        {children}
                      </h2>
                    ),
                    paragraph: ({ children }) => (
                      <p className="text-left">{children}</p>
                    ),
                  }}
                />
              </div>
            );
          })}
      </div>
    </section>
  );
};

export default Card;
