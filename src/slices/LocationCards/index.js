import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.LocationCardsSlice} LocationCardsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<LocationCardsSlice>} LocationCardsProps
 * @param {LocationCardsProps}
 */
const LocationCards = ({ slice }) => {
  console.log("slice location", slice);
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="padded-container section-y-margin-xl"
    >
      <div className="flex flex-col tablet:flex-row justify-center items-center gap-12">
        {slice.items.map((item, i) => {
          return (
            <div key={i} className="mt-8">
              <PrismicNextImage field={item.image} />

              <PrismicRichText
                field={item.title}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="text-black text-center mx-auto mt-4">
                      {children}
                    </h2>
                  ),
                }}
              />
              <PrismicRichText
                field={item.phone_number}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-black text-center mx-auto mt-2">
                      {children}
                    </p>
                  ),
                }}
              />
              <PrismicRichText
                field={item.address}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-black text-center mx-auto mt-4">
                      {children}
                    </p>
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

export default LocationCards;
