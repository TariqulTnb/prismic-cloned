/**
 * @typedef {import("@prismicio/client").Content.LineUpLinksSlice} LineUpLinksSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<LineUpLinksSlice>} LineUpLinksProps
 * @param {LineUpLinksProps}
 */
const LineUpLinks = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for line_up_links (variation: {slice.variation})
      Slices
    </section>
  );
};

export default LineUpLinks;
