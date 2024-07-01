import clsx from "clsx";

/**
 * @typedef {import("@prismicio/client").Content.AnchorLinkSectionSlice} AnchorLinkSectionSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<AnchorLinkSectionSlice>} AnchorLinkSectionProps
 * @param {AnchorLinkSectionProps}
 */
const AnchorLinkSection = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx("h-[80px]")}
      id={slice.primary?.anchor_link}
    ></section>
  );
};

export default AnchorLinkSection;
