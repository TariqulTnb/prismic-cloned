import { PopUpMedia } from "@/components/PopUpMedia";
import { Video } from "@/components/PopUpMedia/Video";
/**
 * @typedef {import("@prismicio/client").Content.PopUpEmbeddedVideoSlice} PopUpEmbeddedVideoSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PopUpEmbeddedVideoSlice>} PopUpEmbeddedVideoProps
 * @param {PopUpEmbeddedVideoProps}
 */
const PopUpEmbeddedVideo = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="padded-container"
    >
      <PopUpMedia video={true} image={slice.primary.poster_image}>
        <Video videoUrl={slice.primary.youtube_embed_key_text} />
      </PopUpMedia>
    </section>
  );
};

export default PopUpEmbeddedVideo;
