import { PrismicNextImage } from "@prismicio/next";

/**
 * @typedef {import("@prismicio/client").Content.ImageBlockSlice} ImageBlockSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<ImageBlockSlice>} ImageBlockProps
 * @param {ImageBlockProps}
 */
const ImageBlock = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="padded-container section-y-margin-xl"
    >
      <div className="flex justify-center">
        <PrismicNextImage field={slice.primary.image} />
      </div>
    </section>
  );
};

export default ImageBlock;
