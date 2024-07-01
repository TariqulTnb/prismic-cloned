/**
 * @typedef {import("@prismicio/client").Content.DefaultOptionsSlice} DefaultOptionsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<DefaultOptionsSlice>} DefaultOptionsProps
 * @param {DefaultOptionsProps}
 */
const DefaultOptions = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for default_options (variation: {slice.variation})
      Slices
    </section>
  );
};

export default DefaultOptions;
