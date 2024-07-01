/**
 * @typedef {import("@prismicio/client").Content.ConfiguratorModeSlice} ConfiguratorModeSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ConfiguratorModeSlice>} ConfiguratorModeProps
 * @param {ConfiguratorModeProps}
 */
const ConfiguratorMode = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for configurator_mode (variation: {slice.variation})
      Slices
    </section>
  );
};

export default ConfiguratorMode;
