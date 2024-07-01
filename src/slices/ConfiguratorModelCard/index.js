/**
 * @typedef {import("@prismicio/client").Content.ConfiguratorModelCardSlice} ConfiguratorModelCardSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ConfiguratorModelCardSlice>} ConfiguratorModelCardProps
 * @param {ConfiguratorModelCardProps}
 */
const ConfiguratorModelCard = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for configurator_model_card (variation:{" "}
      {slice.variation}) Slices
    </section>
  );
};

export default ConfiguratorModelCard;
