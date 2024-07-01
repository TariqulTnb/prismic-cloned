/**
 * @typedef {import("@prismicio/client").Content.PackageOptionsSlice} PackageOptionsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PackageOptionsSlice>} PackageOptionsProps
 * @param {PackageOptionsProps}
 */
const PackageOptions = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for package_options (variation: {slice.variation})
      Slices
    </section>
  );
};

export default PackageOptions;
