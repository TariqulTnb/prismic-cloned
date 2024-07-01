import { PrismicRichText } from "@/components/PrismicRichText";
import { useResponsive } from "@/hooks/useResponsive";
import * as prismic from "@prismicio/client";
import { Dropdown } from "@/components/Dropdown";
import { DropdownTrigger } from "@/components/Dropdown/DropdownTrigger";
import { DropdownItem } from "@/components/Dropdown/DropdownItem";
import { TabButton } from "@/components/TabbedMedia/TabButton";
import { Accordian } from "@/components/Accordian";
import { AccordianItem } from "@/components/Accordian/AccordianItem";
import React from "react";
import clsx from "clsx";
import { PopUpMedia } from "../PopUpMedia";
import { Video } from "../PopUpMedia/Video";

export const TabbedMedia = ({
  activeTabIndex,
  secondaryActiveTabIndex,
  setActiveTabIndex,
  setSecondaryActiveTabIndex,
  children,
  tabData,
  mainTitle,
  onItemSelect,
  getText,
  secondaryTabData,
  getSecondaryText,
  onSecondaryItemSelect,
  popUpElements,
  swiperElements,
  usedCarModel = false,
  usedCarPrice = null,
  usedCarVanTourUrl = null,
  usedCarVanTourPosterImage = null,
}) => {
  const { isMobileSize, isTabletSize, isLaptopSize } = useResponsive();

  const handleTabSelect = (index) => {
    setActiveTabIndex(index);
    if (onItemSelect) {
      onItemSelect(index);
    }
  };

  const handleDropdownItemSelect = (index) => {
    setActiveTabIndex(index);
    if (onItemSelect) {
      onItemSelect(index);
    }
    if (secondaryTabData) {
      onSecondaryItemSelect(0);
    }
  };

  const handleSecondaryDropdownItemSelect = (index) => {
    setSecondaryActiveTabIndex(index);
    onSecondaryItemSelect(index);
  };

  return (
    <>
      {/* // top container - title */}
      <div className="laptop:flex justify-between pb-4 border-b-black tablet:border-b">
        <div className="">
          {prismic.isFilled.richText(mainTitle) && (
            <PrismicRichText
              field={mainTitle}
              components={{
                heading2: ({ children }) => (
                  <h2 className="font-[700px]">{children}</h2>
                ),
              }}
            />
          )}
        </div>
        {/* outer tabs (right side) - tablet only */}
        <>
          {isTabletSize() && !usedCarModel && (
            <div className="flex gap-10 tablet:mt-5 laptop:mt-0">
              {prismic.isFilled.sliceZone(tabData) &&
                // if item.tab_label is the activeTab then add the active class
                tabData.map((item, index) => (
                  <TabButton
                    key={`tab_${index}`}
                    text={getText(item)}
                    index={index}
                    activeTabIndex={activeTabIndex}
                    setActiveTabIndex={setActiveTabIndex}
                    onItemSelect={handleTabSelect}
                  />
                ))}
            </div>
          )}
          {isTabletSize() && usedCarModel && (
            <div className="flex gap-10 tablet:mt-5 laptop:mt-0">
              {prismic.isFilled.richText(usedCarPrice) && (
                // if item.tab_label is the activeTab then add the active class
                <PrismicRichText
                  field={usedCarPrice}
                  components={{
                    heading2: ({ children }) => (
                      <h2 className="text-[#707070] text-[22px]">{children}</h2>
                    ),
                  }}
                />
              )}
            </div>
          )}
        </>
        {/* mobile and tablet dropdown menu instead of tabs */}
        <>
          {prismic.isFilled.sliceZone(tabData) &&
            isMobileSize() &&
            !isLaptopSize() && (
              <>
                <div className="mt-2 text-[14px]">Select:</div>
                <Dropdown
                  trigger={(props) => (
                    <DropdownTrigger
                      text={getText(tabData[activeTabIndex])}
                      {...props}
                    />
                  )}
                  onItemSelect={handleDropdownItemSelect}
                  menu={tabData.map((item, index) => (
                    <DropdownItem
                      key={index}
                      text={getText(item)}
                      index={index}
                      activeIndex={activeTabIndex}
                      onItemSelect={handleDropdownItemSelect}
                    />
                  ))}
                />
              </>
            )}
        </>
      </div>
      {/* // tabbed content - display the one for the active tab index */}
      <div className="tablet:my-6 flex flex-col laptop:flex-row gap-x-10">
        <div className="flex-1">
          {/* inner tabs (left side) - tablet only */}
          {isTabletSize() &&
            secondaryTabData &&
            secondaryTabData.map((item, index) => {
              return (
                <button
                  onClick={() => handleSecondaryDropdownItemSelect(index)}
                  key={`secondary_tab_${index}`}
                  className={clsx(
                    index === secondaryActiveTabIndex
                      ? "text-black bg-[#F1ECE5]"
                      : "text-unselectedTabGray hover:text-black",
                    "cursor-pointer font-semibold px-4 py-2 rounded-xs mr-6"
                  )}
                >
                  <PrismicRichText field={getSecondaryText(item)} />
                </button>
              );
            })}
          {isTabletSize() && usedCarModel && (
            <div className="flex gap-10 tablet:mt-5 laptop:mt-0">
              {prismic.isFilled.group(tabData) &&
                // if item.tab_label is the activeTab then add the active class
                tabData.map((item, index) => {
                  console.log("mapping");
                  return (
                    <button
                      onClick={() => handleDropdownItemSelect(index)}
                      key={`tab_${index}`}
                      className={clsx(
                        index === activeTabIndex
                          ? "text-black bg-[#F1ECE5]"
                          : "text-unselectedTabGray hover:text-black",
                        "cursor-pointer font-semibold px-4 py-2 rounded-xs mr-6"
                      )}
                    >
                      <PrismicRichText field={getText(item)} />
                    </button>
                  );
                })}
            </div>
          )}
          {/* No inner tabs - use accordian instead for mobile only */}
          {!isTabletSize() && secondaryTabData && (
            <Accordian>
              {secondaryTabData.map((item, index) => {
                return (
                  <AccordianItem
                    title={getSecondaryText(item)}
                    key={`secondary_tab_${index}`}
                  >
                    {React.Children.toArray(children)[index]}
                    {swiperElements[index]}
                    {popUpElements[index]}
                  </AccordianItem>
                );
              })}
            </Accordian>
          )}

          {/* if secondary tab data, display data + swiper / pop up based on secondary tabs index */}
          {isTabletSize() &&
            secondaryTabData &&
            React.Children.toArray(children)[secondaryActiveTabIndex]}

          {/* if no secondary tab data, display data based on outer tabs index */}
          {!secondaryTabData &&
            React.Children.toArray(children)[activeTabIndex]}

          {!secondaryTabData &&
            !isTabletSize() &&
            !usedCarModel &&
            swiperElements &&
            swiperElements[activeTabIndex] && (
              <div className="flex-none">{swiperElements[activeTabIndex]}</div>
            )}
        </div>

        {/* if secondary tab data, display data based on secondary tabs index */}
        {isTabletSize() &&
          swiperElements &&
          swiperElements[secondaryActiveTabIndex] && (
            <div className="flex-none">
              {swiperElements[secondaryActiveTabIndex]}
            </div>
          )}

        {/* display pop up video if there is a  */}
        {!secondaryTabData &&
          usedCarModel &&
          swiperElements &&
          usedCarVanTourUrl &&
          usedCarVanTourPosterImage &&
          activeTabIndex === 0 && (
            <div className="flex-1">
              <PopUpMedia image={usedCarVanTourPosterImage} video={true}>
                <Video videoUrl={usedCarVanTourUrl} />
              </PopUpMedia>
            </div>
          )}

        {/* this one is being displayed */}
        {/* display the only swiper element here if van tour is not selected */}
        {!secondaryTabData &&
          usedCarModel &&
          swiperElements &&
          activeTabIndex > 0 &&
          usedCarVanTourUrl &&
          swiperElements[0] && (
            <div className="flex-none">{swiperElements[0]}</div>
          )}

        {/* if no secondary tab data, display data based on outer tabs index */}
        {!secondaryTabData &&
          !usedCarModel &&
          isTabletSize() &&
          swiperElements &&
          swiperElements[activeTabIndex] && (
            <div className="flex-none">{swiperElements[activeTabIndex]}</div>
          )}

        {isTabletSize() &&
          popUpElements &&
          popUpElements[secondaryActiveTabIndex] && (
            <div className="flex-1">
              {popUpElements[secondaryActiveTabIndex]}
            </div>
          )}
      </div>
    </>
  );
};
