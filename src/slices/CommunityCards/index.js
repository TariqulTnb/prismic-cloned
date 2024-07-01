import { createClient } from "@/prismicio";
import { useState, useEffect } from "react";
import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage } from "@prismicio/next";
import * as prismic from "@prismicio/client";
import { TabButton } from "@/components/TabbedMedia/TabButton";
import { PopUpMedia } from "@/components/PopUpMedia";
import { Video } from "@/components/PopUpMedia/Video";
import { useResponsive } from "@/hooks/useResponsive";
import { Dropdown } from "@/components/Dropdown";
import { DropdownTrigger } from "@/components/Dropdown/DropdownTrigger";
import { DropdownItem } from "@/components/Dropdown/DropdownItem";
import clsx from "clsx";
import { WhiteButton } from "@/components/Common/WhiteButton";
import { PopUp } from "@/components/Common/PopUp";
import { Pagination } from "@/components/Common/Pagination";
import { useRouter } from "next/router";

/**
 * @typedef {import("@prismicio/client").Content.CommunityCardSlice} CommunityCardSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CommunityCardSlice>} CommunityCardProps
 * @param {CommunityCardProps}
 */
const CommunityCard = ({ slice }) => {
  const client = createClient();

  const { isMobileSize, isTabletSize, isLaptopSize } = useResponsive();

  const [communityInfo, setCommunityInfo] = useState(null);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(null);

  const router = useRouter();

  const handleDropdownItemSelect = (index) => {
    setActiveTabIndex(index);
    setCurrentPage(1);
  };

  useEffect(() => {
    if (
      communityInfo &&
      communityInfo[activeTabIndex].data.slices[0]?.items?.length
    ) {
      if (!isLaptopSize()) {
        setPageCount(communityInfo[activeTabIndex].data.slices[0].items.length);
      } else {
        setPageCount(
          Math.ceil(
            communityInfo[activeTabIndex].data.slices[0].items.length / 4
          )
        );
      }
    }
  }, [communityInfo, activeTabIndex]);

  const getCurrentPageItems = () => {
    if (
      communityInfo &&
      communityInfo[activeTabIndex].data.slices[0]?.items?.length
    ) {
      if (!isLaptopSize()) {
        return communityInfo[activeTabIndex].data.slices[0].items[
          currentPage - 1
        ];
      } else {
        return communityInfo[activeTabIndex].data.slices[0].items.slice(
          (currentPage - 1) * 4,
          currentPage * 4
        );
      }
    }
  };

  console.log("comms", communityInfo);

  useEffect(() => {
    let lang = window.location.href.includes("en-au") ? "en-au" : "ja-jp";

    client
      .getByType("communityinfo", {
        lang: lang,
      })
      .then((res) => {
        setCommunityInfo(res.results);
      });
  }, []);

  useEffect(() => {
    let lang = window.location.href.includes("en-au") ? "en-au" : "ja-jp";

    client
      .getByType("communityinfo", {
        lang: lang,
      })
      .then((res) => {
        setCommunityInfo(res.results);
      });
  }, [router.locale]);

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="padded-container section-y-margin-xl flex-col flex items-center"
    >
      <div className="w-full">
        {prismic.isFilled.richText(slice.primary.title) && (
          <PrismicRichText
            field={slice.primary.title}
            components={{
              heading2: ({ children }) => (
                <h2 className="text-center">{children}</h2>
              ),
              paragraph: ({ children }) => (
                <p className="text-center mt-2">{children}</p>
              ),
            }}
          />
        )}
        {isLaptopSize() && (
          <div className="border-b-black border-b w-full ">
            <div className="flex justify-evenly max-w-sm mx-auto my-6">
              {communityInfo?.map((item, i) => {
                return (
                  <>
                    <TabButton
                      key={i}
                      text={item.data.title}
                      index={i}
                      activeTabIndex={activeTabIndex}
                      setActiveTabIndex={setActiveTabIndex}
                    />{" "}
                    {i < communityInfo.length - 1 && (
                      <div className="flex items-center font-bold">|</div>
                    )}
                  </>
                );
              })}
            </div>
          </div>
        )}
        {(isMobileSize() || (isTabletSize() && !isLaptopSize())) &&
          communityInfo && (
            <>
              <div className="mt-8 text-[14px]">Select:</div>
              <Dropdown
                onItemSelect={(index) => handleDropdownItemSelect(index)}
                trigger={(props) => (
                  <DropdownTrigger
                    text={
                      communityInfo && communityInfo[activeTabIndex].data.title
                    }
                    {...props}
                  />
                )}
                menu={communityInfo.map((item, index) => (
                  <DropdownItem
                    key={index}
                    text={item.data.title}
                    index={index}
                    activeIndex={activeTabIndex}
                  />
                ))}
              />
              <TabletCommunityInfo
                image={getCurrentPageItems()?.image}
                title={getCurrentPageItems()?.title}
                content={getCurrentPageItems()?.content}
                buttonText={getCurrentPageItems()?.button_text}
                videoUrl={getCurrentPageItems()?.video_url}
              />

              {/* community card mobile goes here */}
              {/* outer div - image, div with text, button to launch PopUp */}
            </>
          )}
      </div>
      {isLaptopSize() && (
        <div
          className={clsx(
            communityInfo &&
              communityInfo[activeTabIndex].data.slices[0].items.length > 2
              ? "laptop:h-[670px]"
              : "laptop:h-[300px]",
            "community-grid"
          )}
        >
          {communityInfo &&
            getCurrentPageItems().map((item, i) => {
              return (
                <div className="mx-auto" key={i}>
                  <PopUpMedia
                    image={item.image}
                    className="rounded-extraLarge"
                    isImage={true}
                    video={true}
                    title={item.title}
                    communityOverlay={
                      <CommunityInfo
                        title={item.title}
                        content={item.content}
                        buttonText={item.button_text}
                      />
                    }
                    buttonText={item.button_text}
                  >
                    <Video videoUrl={item.video_url} />
                  </PopUpMedia>
                </div>
              );
            })}
        </div>
      )}
      {pageCount > 1 && (
        <div className="mt-2 laptop:mt-8">
          <Pagination
            currentPage={currentPage}
            pageCount={pageCount}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </section>
  );
};

export default CommunityCard;

const TabletCommunityInfo = ({
  title,
  content,
  image,
  buttonText,
  videoUrl,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    console.log("closing");
    setOpen(false);
  };

  return (
    <div className="my-6 ">
      <PrismicNextImage field={image} />
      <div className="bg-communityGreen -mt-1">
        <div className="p-4 flex flex-col min-h-[300px] ">
          <PrismicRichText
            field={title}
            components={{
              heading2: ({ children }) => (
                <h2 className="text-white text-[22px]">{children}</h2>
              ),
              paragraph: ({ children }) => (
                <p className="text-white font-bold">{children}</p>
              ),
            }}
          />
          <PrismicRichText
            field={content}
            components={{
              paragraph: ({ children }) => (
                <p className="text-white mt-4">{children}</p>
              ),
            }}
          />
          <div className="flex-1 flex items-end">
            <WhiteButton
              buttonText={buttonText}
              setOpen={setOpen}
              className="mt-6"
              fullWidth={true}
            />
          </div>
          <PopUp open={open} handleClose={handleClose}>
            <Video videoUrl={videoUrl} />
          </PopUp>
        </div>
      </div>
    </div>
  );
};

const CommunityInfo = ({ title, content }) => {
  return (
    <div className="pt-6 pl-6 pr-24">
      <PrismicRichText
        field={title}
        components={{
          paragraph: ({ children }) => (
            <p className="text-white text-[18px] my-0">{children}</p>
          ),
        }}
      />
      <PrismicRichText
        field={content}
        components={{
          paragraph: ({ children }) => (
            <p className="text-white text-[18px] my-4">{children}</p>
          ),
        }}
      />
    </div>
  );
};
