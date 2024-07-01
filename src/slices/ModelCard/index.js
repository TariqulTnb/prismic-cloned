import { PrismicRichText } from "@/components/PrismicRichText";
import * as prismic from "@prismicio/client";

import { useResponsive } from "@/hooks/useResponsive";
import { ModelCardItem } from "./components/ModelCardItem";
import { MobileWithResponsiveColumnImages } from "./components/MobileWithResponsiveColumnImages";
import { TabletWithResponsiveColumnImages } from "./components/TabletWithResponsiveColumnImages";
import { ModelCardWithImageLogoAndIcons } from "./components/ModelCardWithImageLogoAndIcons";
/**
 * @typedef {import("@prismicio/client").Content.ModelCardSlice} ModelCardSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ModelCardSlice>} ModelCardProps
 * @param {ModelCardProps}
 */

const ModelCard = ({ slice }) => {
  const { isMobileSize, isTabletSize } = useResponsive();

  if (slice.variation === "withImageLogoAndIcons")
    return <ModelCardWithImageLogoAndIcons slice={slice} />;

  const determineComponentToRender = () => {
    if (
      isMobileSize() &&
      !isTabletSize() &&
      slice.variation === "withResponsiveColumnImages"
    ) {
      return <MobileWithResponsiveColumnImages slice={slice} />;
    } else if (
      isTabletSize() &&
      slice.variation === "withResponsiveColumnImages"
    ) {
      return <TabletWithResponsiveColumnImages slice={slice} />;
    } else if (slice.variation === "default") {
      return <DefaultComponent slice={slice} />;
    } else return null;
  };

  return (
    <section
      className="semi-padded-container section-y-margin-xl"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText
        field={slice.primary.title}
        components={{
          heading2: ({ children }) => (
            <h2 className="text-black my-4 px-4 text-center">{children}</h2>
          ),
          paragraph: ({ children }) => (
            <p className="text-center">{children}</p>
          ),
        }}
      />

      {determineComponentToRender()}
    </section>
  );
};

{
  /* if it's mobile and default variation it's easy to have the same component be rendered with some responsive differences like on homepage */
}

const DefaultComponent = ({ slice }) => {
  return (
    <div className="flex-col no-scrollbar scroll-smooth flex tablet:flex tablet:flex-row gap-6 tablet:gap-8 section-y-margin">
      {/* Model Cards start */}
      {prismic.isFilled.group(slice.items) &&
        slice.items.map((item, index) => {
          return <ModelCardItem item={item} key={`model_${index}`} />;
        })}
    </div>
  );
};

export default ModelCard;
