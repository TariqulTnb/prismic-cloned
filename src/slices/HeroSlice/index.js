import * as prismic from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { MainMedia } from "./components/MainMedia";
import { MobileTextBox } from "./components/MobileTextBox";
import { TabletTextBox } from "./components/TabletTextBox";
import { OverlappingSection } from "./components/OverlappingSection";
import { PrismicRichText } from "@/components/PrismicRichText";
import { useResponsive } from "@/hooks/useResponsive";
import { useContext, useEffect, useState, useCallback, useRef } from "react";
import HeroHeightContext from "@/components/HeroHeightContext";
import clsx from "clsx";

/**
 * @typedef {import("@prismicio/client").Content.HeroSliceSlice} HeroSliceSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<HeroSliceSlice>} HeroSliceProps
 * @param {HeroSliceProps}
 */
const HeroSlice = ({ slice }) => {
  const { isMobileSize, isTabletSize } = useResponsive();
  const { heroHeight } = useContext(HeroHeightContext);

  const menuRef = useRef(null);

  const scrollLeft = () => {
    if (menuRef.current) {
      // Calculate the new scroll position by subtracting halfScrollContainerWidth from the current scroll position
      if (!selectedAnchorLink) return;
      const index = slice.items.findIndex(
        (item) => item.menu_anchor_link === selectedAnchorLink
      );
      if (index === 0) return;
      const newSelectedLink = slice.items[index - 1]?.menu_anchor_link;
      let element = document.querySelector(`[href="#${newSelectedLink}"]`);

      if (element) {
        element.click();
      }

      const newScrollPosition =
        menuRef.current.parentElement.scrollLeft - halfScrollContainerWidth;
      // Set the new scroll position

      menuRef.current.parentElement.scrollLeft = newScrollPosition;
    }
  };

  const scrollRight = () => {
    if (menuRef.current) {
      // if no anchor is selected, select the first one
      let selectedLink;
      if (!selectedAnchorLink) {
        selectedLink = slice.items[0]?.menu_anchor_link;
      } else {
        // find the index of the next menu anchor link
        const index = slice.items.findIndex(
          (item) => item.menu_anchor_link === selectedAnchorLink
        );
        selectedLink = slice.items[index + 1]?.menu_anchor_link;
      }

      let element = document.querySelector(`[href="#${selectedLink}"]`);
      if (element) {
        element.click();
      }

      // if the link is the first one, don't scroll
      if (selectedLink !== slice.items[0]?.menu_anchor_link) {
        // Calculate the new scroll position by adding halfScrollContainerWidth to the current scroll position
        const newScrollPosition =
          menuRef.current.parentElement.scrollLeft + halfScrollContainerWidth;
        // Set the new scroll position
        menuRef.current.parentElement.scrollLeft = newScrollPosition;
      }
    }
  };

  const [selectedAnchorLink, setSelectedAnchorLink] = useState(null);
  const [halfScrollContainerWidth, setHalfScrollContainerWidth] =
    useState(null);

  useEffect(() => {
    if (menuRef.current) {
      const preventDefault = (e) => e.preventDefault();

      const halfContainerWidth = menuRef.current.offsetWidth / 2;
      menuRef.current.parentElement.addEventListener(
        "touchmove",
        preventDefault,
        { passive: false }
      );
      setHalfScrollContainerWidth(halfContainerWidth);
      // set the width of each child to be half of the container width
      for (let i = 0; i < menuRef.current.children.length; i++) {
        menuRef.current.children[i].style.width = halfContainerWidth + "px";
        if (i === menuRef.current.children.length - 1) {
          menuRef.current.children[i].style.marginRight = "24px";
        }
      }
    }
  }, []);

  useEffect(() => {
    console.log("hero height is", heroHeight);
  }, [heroHeight]);

  const hasTitleText = () => {
    return (
      prismic.isFilled.richText(slice.primary.centered_text) ||
      prismic.isFilled.richText(slice.primary.side_title) ||
      prismic.isFilled.richText(slice.primary.text)
    );
  };

  const handleAnchorClick = useCallback((e, anchorLink) => {
    // Prevent the default link click behavior
    e.preventDefault();

    // Find the target element by ID
    const element = document.querySelector(`#${anchorLink}`);

    // If found, scroll to it
    if (element) {
      const rect = element.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (isMobileSize()) {
        window.scrollTo({
          top: rect.top + scrollTop - 150,
          behavior: "smooth",
        });
      } else {
        window.scrollTo({
          top: rect.top + scrollTop - 100,
          behavior: "smooth",
        });
      }
    }
  }, []);

  const hasTextBox = () => {
    return (
      slice.variation === "leftText" ||
      slice.variation === "centeredText" ||
      slice.variation === "centeredTextWithButton" ||
      slice.variation === "overlappingSectionWithVideo" ||
      slice.variation === "centeredTextWithVideo" ||
      slice.variation === "centerTextOverlappingVideo" ||
      slice.variation === "centerTextWithMenu"
    );
  };

  const hasOverlappingSection = () => {
    return (
      slice.variation === "overlappingSection" ||
      slice.variation === "overlappingSectionWithVideo" ||
      slice.variation === "centerTextOverlappingVideo" ||
      slice.variation === "centerTextWithMenu" ||
      slice.variation === "modelHero"
    );
  };

  const returnTextInHero = () => {
    return slice.variation === "overlappingSectionWithVideo" ? (
      <TabletTextBox slice={slice} />
    ) : (
      hasTextBox() && isTabletSize() && <TabletTextBox slice={slice} />
    );
  };
  return (
    <>
      <section
        data-slice-type={slice.slice_type}
        data-slice-variation={slice.variation}
        className={clsx(
          slice.variation === "centerTextWithMenu" &&
            isMobileSize() &&
            !isTabletSize() &&
            "mt-12",
          "max-w-[1920px] mx-auto h-full w-full relative",
          slice.variation === "leftText" && "pb-0 tablet:pb-6"
        )}
      >
        {isMobileSize() &&
          slice.variation === "centerTextWithMenu" &&
          prismic.isFilled.group(slice.items) && (
            <div className="fixed z-30 top-[78px] flex justify-center items-center w-full h-[60px] bg-menuBeigeDark overflow-scroll no-scrollbar scroll-smooth whitespace-nowrap">
              {selectedAnchorLink &&
                selectedAnchorLink !== slice.items[0]?.menu_anchor_link && (
                  <button
                    className="fixed left-0 h-12 pl-2 w-8 bg-menuBeigeDark z-40"
                    onClick={scrollLeft}
                  >
                    <svg
                      width="14"
                      height="21"
                      viewBox="0 0 14 21"
                      fill="none"
                      className="inline"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        id="Vector 74 (Stroke)"
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M10.6081 0L14 3.18738L6.61211 10.5L14 17.8126L10.6081 21L0 10.5L10.6081 0Z"
                        fill="#3B6552"
                        fill-opacity="0.4"
                      />
                    </svg>
                  </button>
                )}
              {/* inner text container for links - should display two at a time */}
              <div ref={menuRef} className="refContainer w-[calc(100%-4rem)]">
                {slice.items.map((item, index) => {
                  return (
                    // get the space of the element width
                    // find out at what point the element should start so that exactly two fit on the screen at once
                    <div
                      key={`${item.menu_item_label}_mobile_${index}`}
                      href={`#${item?.menu_anchor_link}`}
                      onClick={(e) => {
                        handleAnchorClick(e, item?.menu_anchor_link);
                        setSelectedAnchorLink(item?.menu_anchor_link);
                      }}
                      className="inline-block text-center"
                    >
                      <PrismicRichText
                        field={item.menu_item_label}
                        components={{
                          paragraph: ({ children }) => (
                            <p
                              className={clsx(
                                selectedAnchorLink === item?.menu_anchor_link &&
                                  "text-ddGreen font-bold underline-offset-[5px] decoration-ddGreen underline decoration-2",
                                ""
                              )}
                            >
                              {children}
                            </p>
                          ),
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              {selectedAnchorLink !==
                slice.items[slice.items.length - 1]?.menu_anchor_link && (
                <button
                  className="fixed right-0 bg-menuBeigeDark h-12 w-8 z-40"
                  onClick={scrollRight}
                >
                  <svg
                    width="14"
                    height="21"
                    viewBox="0 0 14 21"
                    fill="none"
                    className="inline"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Vector 74 (Stroke)"
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M3.39191 21L1.6287e-06 17.8126L7.38789 10.5L3.5012e-07 3.18738L3.39191 -9.7996e-07L14 10.5L3.39191 21Z"
                      fill="#3B6552"
                      fill-opacity="0.4"
                    />
                  </svg>
                </button>
              )}
            </div>
          )}
        {/* this is either the main image or video */}
        <MainMedia slice={slice}>{returnTextInHero()}</MainMedia>
        {hasTextBox() && hasTitleText() && isMobileSize() && (
          <MobileTextBox slice={slice} />
        )}
        {hasOverlappingSection() && (
          <>
            <OverlappingSection slice={slice} />
            {hasTitleText() && (
              <div className="mx-auto tablet:w-[567px] px-4">
                <PrismicRichText
                  field={
                    isTabletSize()
                      ? slice.primary.video_text
                      : slice.primary.video_text_mobile
                  }
                  components={{
                    paragraph: ({ children }) => (
                      <p className="text-black my-4 px-4 text-center">
                        {children}
                      </p>
                    ),
                    heading2: ({ children }) => (
                      <h2 className="my-8 text-center font-[400] text-[22px]">
                        {children}
                      </h2>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-center font-[700]">
                        {children}
                      </strong>
                    ),
                  }}
                />
              </div>
            )}
          </>
        )}
      </section>

      {isTabletSize() &&
        slice.variation === "centerTextWithMenu" &&
        prismic.isFilled.group(slice.items) && (
          <div className="max-w-5xl mx-auto gap-6 flex justify-center -m-11 z-10 relative mb-24">
            {slice.items.map((item, index) => {
              return (
                <a
                  key={`${item.menu_item_label}_${index}`}
                  href={`#${item?.menu_anchor_link}`}
                  onClick={(e) => {
                    handleAnchorClick(e, item?.menu_anchor_link);
                    setSelectedAnchorLink(item?.menu_anchor_link);
                  }}
                >
                  <div className="flex flex-col justify-center items-center rounded-md bg-menuBeigeDark px-4 py-2 h-[88px] max-w-[170px]">
                    <PrismicNextImage
                      className="mx-auto h-10 "
                      field={item.menu_item_icon}
                    />
                    <PrismicRichText
                      field={item.menu_item_label}
                      components={{
                        paragraph: ({ children }) => (
                          <p className="text-center mt-2 font-bold text-xs">
                            {children}
                          </p>
                        ),
                      }}
                    />
                  </div>
                </a>
              );
            })}
          </div>
        )}
    </>
  );
};

export default HeroSlice;
