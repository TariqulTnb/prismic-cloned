import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@/components/PrismicRichText";
import clsx from "clsx";
import { Button } from "@/components/Common/Button";
import { PopUpMedia } from "@/components/PopUpMedia";
import { Video } from "@/components/PopUpMedia/Video";

/**
 * @typedef {import("@prismicio/client").Content.TeamMembersSlice} TeamMembersSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TeamMembersSlice>} TeamMembersProps
 * @param {TeamMembersProps}
 */
const TeamMembers = ({ slice }) => {
  console.log("contact slice", slice);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx("padded-container section-y-margin-xl")}
    >
      <div
        className={clsx(
          slice.variation === "contactPage" ? "contact-team-grid" : "team-grid"
        )}
      >
        {slice.items.map((item, i) => {
          return (
            <>
              <div className="photo flex justify-center">
                <PrismicNextImage
                  key={i}
                  className="rounded-extraLarge "
                  field={item.image}
                />
              </div>
              <PrismicRichText
                key={i}
                field={item.name}
                components={{
                  heading2: ({ children }) => (
                    <h2 className="my-4 text-center">{children}</h2>
                  ),
                }}
              />
              <PrismicRichText
                key={i}
                field={item.position}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-center mb-4">{children}</p>
                  ),
                }}
              />
              <PrismicRichText
                key={i}
                field={item.description}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-left mb-7">{children}</p>
                  ),
                }}
              />
              {slice.variation === "default" && (
                <Button link={item.button_link}>
                  <PrismicRichText key={i} field={item.button_text} />
                </Button>
              )}
              {slice.variation === "contactPage" && (
                <>
                  <PrismicRichText
                    field={item.hash_tags}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="text-left mb-4 text-[#707070]">
                          {children}
                        </p>
                      ),
                    }}
                  />
                  <div>
                    <Button link={item.button_link}>
                      <PrismicRichText key={i} field={item.button_text} />
                    </Button>
                  </div>
                  <div className="w-full mt-2 mb-20 laptop:mb-2 tablet:mt-12 laptop:mt-16">
                    <PopUpMedia video image={item.youtube_thumbnail}>
                      <Video videoUrl={item.youtube_video_url} />
                    </PopUpMedia>
                  </div>
                </>
              )}
            </>
          );
        })}
      </div>
    </section>
  );
};

export default TeamMembers;
