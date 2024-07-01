/**
 * @typedef {import("@prismicio/client").Content.OptionPopUpSlice} OptionPopUpSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<OptionPopUpSlice>} OptionPopUpProps
 * @param {OptionPopUpProps}
 */
const OptionPopUp = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for option_pop_up (variation: {slice.variation})
      Slices
    </section>
  );
};

export default OptionPopUp;
