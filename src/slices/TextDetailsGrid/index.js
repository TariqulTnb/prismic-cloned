import { PerformanceGrid } from "@/components/PerformanceGrid";

/**
 * @typedef {import("@prismicio/client").Content.PerformanceTextSlice} PerformanceTextSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PerformanceTextSlice>} PerformanceTextProps
 * @param {PerformanceTextProps}
 */
const PerformanceText = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PerformanceGrid items={slice.items} />
    </section>
  );
};

export default PerformanceText;
