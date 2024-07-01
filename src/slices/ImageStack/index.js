import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@/components/PrismicRichText";
import * as prismic from "@prismicio/client";

/**
 * @typedef {import("@prismicio/client").Content.ImageStackSlice} ImageStackSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImageStackSlice>} ImageStackProps
 * @param {ImageStackProps}
 */
const ImageStack = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="padded-container"
    >
      <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-4 gap-x-8 gap-y-8 w-full my-8 laptop:my-24">
        {prismic.isFilled.group(slice.items) &&
          slice.items.map((item, index) => {
            return (
              <div key={index} className="mx-auto flex flex-col items-center">
                <PrismicNextImage field={item.image} />
                <PrismicRichText
                  field={item.subtitle}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="text-center my-4">{children}</p>
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

export default ImageStack;
