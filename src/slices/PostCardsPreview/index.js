import { PrismicRichText } from "@/components/PrismicRichText";
import * as prismic from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import clsx from "clsx";
import { Button } from "@/components/Common/Button";
import { PopUp } from "@/components/Common/PopUp";
import { useState } from "react";
import { Video } from "@/components/PopUpMedia/Video";

/**
 * @typedef {import("@prismicio/client").Content.PostCardsPreviewSlice} PostCardsPreviewSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<PostCardsPreviewSlice>} PostCardsPreviewProps
 * @param {PostCardsPreviewProps}
 */
const PostCardsPreview = ({ slice }) => {
  const [showPopUp, setShowPopUp] = useState(null);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="padded-container my-6"
    >
      <div className="text-left tablet:text-center post-preview-cards">
        <PrismicRichText
          field={slice.primary.main_title}
          components={{
            heading2: ({ children }) => {
              return <h2 className="font-bold">{children}</h2>;
            },
          }}
        />
        <PrismicRichText
          field={slice.primary.subtitle}
          components={{
            paragraph: ({ children }) => {
              return <p className="mt-4 tablet:mt-6">{children}</p>;
            },
          }}
        />
      </div>
      <div
        className={clsx(
          slice.variation === "twoItems"
            ? "two-item-preview-grid"
            : "preview-grid",
          "mt-10 laptop:mt-16 mx-auto"
        )}
      >
        {prismic.isFilled.group(slice.items) &&
          slice.items.map((item, index) => {
            return (
              <>
                {slice.variation === "default" ||
                  (slice.variation === "withButtons" && (
                    <PrismicNextLink
                      className="rounded-full"
                      field={item.post_link}
                    >
                      <PrismicNextImage
                        className={clsx(
                          "shadow mt-2 laptop:mt-0 mx-auto rounded-full"
                        )}
                        field={item.card_image}
                      />
                    </PrismicNextLink>
                  ))}
                {slice.variation === "linksToPopUpVideo" && (
                  <div
                    className="cursor-pointer"
                    onClick={() => setShowPopUp(index)}
                  >
                    <PrismicNextImage
                      className={clsx(
                        "shadow mt-2 laptop:mt-0 mx-auto rounded-full"
                      )}
                      field={item.card_image}
                    />
                  </div>
                )}

                <div className={clsx("mt-2 laptop:mt-0")}>
                  <PrismicRichText
                    field={item.card_preview_text}
                    components={{
                      paragraph: ({ children }) => {
                        return <p className="mt-4">{children}</p>;
                      },
                      heading2: ({ children }) => {
                        return (
                          <h2 className="font-bold text-[21px]">{children}</h2>
                        );
                      },
                    }}
                  />
                </div>
                <div className={clsx("mt-4 laptop:mt-0")}>
                  {slice.variation === "default" && (
                    <PrismicNextLink field={item.post_link}>
                      <PrismicRichText
                        field={item.learn_more_text}
                        components={{
                          paragraph: ({ children }) => {
                            return (
                              <p className="underline underline-offset-2 mb-8">
                                {children}
                              </p>
                            );
                          },
                        }}
                      />
                    </PrismicNextLink>
                  )}
                  {slice.variation === "withButtons" && (
                    <div className="flex justify-center my-6">
                      <Button link={item.post_link}>
                        <PrismicRichText
                          field={item.learn_more_text}
                          components={{
                            paragraph: ({ children }) => {
                              return <p className="">{children}</p>;
                            },
                          }}
                        />
                      </Button>
                    </div>
                  )}
                  {slice.variation === "linksToPopUpVideo" && (
                    <>
                      <PopUp
                        open={showPopUp === index}
                        handleClose={() => setShowPopUp(null)}
                      >
                        <Video videoUrl={item.youtube_video_url} />
                      </PopUp>
                      <button onClick={() => setShowPopUp(index)}>
                        <PrismicRichText
                          field={item.learn_more_text}
                          components={{
                            paragraph: ({ children }) => {
                              return (
                                <p className="cursor-pointer underline underline-offset-2 mb-8">
                                  {children}
                                </p>
                              );
                            },
                          }}
                        />
                      </button>
                    </>
                  )}
                </div>
              </>
            );
          })}
      </div>
      {slice.variation !== "withButtons" && (
        <div className="flex justify-center mt-8 tablet:mt-16">
          <Button link={slice.primary.button_link}>
            <PrismicRichText
              field={slice.primary.button_text}
              components={{
                paragraph: ({ children }) => {
                  return <p className="">{children}</p>;
                },
              }}
            />
          </Button>
        </div>
      )}
    </section>
  );
};

export default PostCardsPreview;
