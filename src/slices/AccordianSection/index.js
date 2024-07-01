import * as prismic from "@prismicio/client";
import { Accordian } from "@/components/Accordian";
import { AccordianItem } from "@/components/Accordian/AccordianItem";
import { PrismicRichText } from "@/components/PrismicRichText";
import { useResponsive } from "@/hooks/useResponsive";
/**
 * @typedef {import("@prismicio/client").Content.AccordianSectionSlice} AccordianSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<AccordianSectionSlice>} AccordianSectionProps
 * @param {AccordianSectionProps}
 */
const AccordianSection = ({ slice }) => {
  const { isMobileSize, isTabletSize } = useResponsive();
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      id={slice.primary?.anchor_link}
      className="padded-container section-y-margin-xl"
    >
      {prismic.isFilled.richText(slice.primary.title) && (
        <PrismicRichText field={slice.primary.title} />
      )}
      <Accordian>
        {slice.items.map((item, i) => {
          return (
            <AccordianItem
              key={i}
              title={item.title}
              contents={item.content}
              plusIconOnRight={isMobileSize() && !isTabletSize()}
            />
          );
        })}
      </Accordian>
    </section>
  );
};

export default AccordianSection;
