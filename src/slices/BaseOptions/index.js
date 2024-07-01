/**
 * @typedef {import("@prismicio/client").Content.BaseOptionsSlice} BaseOptionsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<BaseOptionsSlice>} BaseOptionsProps
 * @param {BaseOptionsProps}
 */
const BaseOptions = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for base_options (variation: {slice.variation})
      Slices
    </section>
  );
};

export default BaseOptions;
