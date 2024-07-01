import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { PrismicRichText } from "@/components/PrismicRichText";
import * as prismic from "@prismicio/client";
import { PopUpMedia } from "@/components/PopUpMedia";
import { Video } from "@/components/PopUpMedia/Video";

export const OverlappingSection = ({ slice }) => {
  return (
    <>
      {prismic.isFilled.richText(slice.primary.section_text) && (
        <div className="grid grid-cols-1 tablet:grid-cols-2 max-w-[1920px] gap-x-10 laptop:gap-x-20 gap-y-1 padded-container">
          {prismic.isFilled.richText(slice.primary.section_text) && (
            <div
              className={clsx(
                slice.primary?.section_text_right ? "order-2" : "order-1 ",
                `text-center laptop:text-left`
              )}
            >
              <PrismicRichText
                field={slice.primary.section_text}
                components={{
                  paragraph: ({ children }) => {
                    return <p className="mt-3 text-left">{children}</p>;
                  },
                  heading2: ({ children }) => (
                    <h2 className="my-8 text-center tablet:text-left">
                      {children}
                    </h2>
                  ),
                }}
              />
            </div>
          )}
          {prismic.isFilled.image(slice.primary.overlapping_image) && (
            <div
              className={clsx(
                slice.primary?.section_text_right ? "order-1" : "order-2",
                "text-center laptop:text-left "
              )}
            >
              <PrismicNextImage
                field={slice.primary.overlapping_image}
                className="tablet:-mt-12 mt-10 z-10 relative"
              />
            </div>
          )}
        </div>
      )}
      <div className="tablet:-mt-12 flex-1 padded-container">
        {prismic.isFilled.keyText(slice.primary.overlapping_video_url) && (
          <PopUpMedia
            image={slice.primary.video_poster_image}
            video={slice.primary.overlapping_video_url}
          >
            <Video videoUrl={slice.primary.overlapping_video_url} />
          </PopUpMedia>
        )}
      </div>
    </>
  );
};
