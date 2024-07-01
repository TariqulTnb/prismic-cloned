/**
 * @typedef {import("@prismicio/client").Content.NodesSlice} NodesSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<NodesSlice>} NodesProps
 * @param {NodesProps}
 */
const Nodes = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for nodes (variation: {slice.variation}) Slices
    </section>
  );
};

export default Nodes;
