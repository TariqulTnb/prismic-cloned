/**
 * @typedef {import("@prismicio/client").Content.PreviewModeSlice} PreviewModeSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PreviewModeSlice>} PreviewModeProps
 * @param {PreviewModeProps}
 */
const PreviewMode = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for preview_mode (variation: {slice.variation})
      Slices
    </section>
  );
};

export default PreviewMode;
