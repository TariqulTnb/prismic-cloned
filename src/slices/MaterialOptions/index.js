/**
 * @typedef {import("@prismicio/client").Content.SeatOptionsSlice} SeatOptionsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<SeatOptionsSlice>} SeatOptionsProps
 * @param {SeatOptionsProps}
 */
const SeatOptions = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for seat_options (variation: {slice.variation})
      Slices
    </section>
  );
};

export default SeatOptions;
