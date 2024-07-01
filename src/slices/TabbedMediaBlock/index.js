import { createClient } from "@/prismicio";
import { useState, useEffect } from "react";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Swiper } from "@/components/Swiper";
import React from "react";
import { PopUpMedia } from "@/components/PopUpMedia";
import { Video } from "@/components/PopUpMedia/Video";
import { useResponsive } from "@/hooks/useResponsive";
import { Accordian } from "@/components/Accordian";
import { AccordianItem } from "@/components/Accordian/AccordianItem";
import { useRouter } from "next/router";
import { TabbedMedia } from "@/components/TabbedMedia";
import { PrismicNextImage } from "@prismicio/next";
import { PerformanceGrid } from "@/components/PerformanceGrid";
import { PackageFeatureItem } from "@/slices/TabbedMediaBlock/components/PackageFeatureItem";

const TabbedFeatureText = ({ text }) => {
  return (
    <div className="laptop:max-w-lg my-6">
      <PrismicRichText
        field={text}
        components={{
          listItem: ({ children }) => (
            <li className="mb-1 list-disc pl-1 last:mb-0 md:pl-2 text-[16px] laptop:text-[18px]">
              {children}
            </li>
          ),
        }}
      />
    </div>
  );
};

/**
 * @typedef {import("@prismicio/client").Content.TabbedMediaBlockSlice} TabbedMediaBlockSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<TabbedMediaBlockSlice>} TabbedMediaBlockProps
 * @param {TabbedMediaBlockProps}
 *
 */
const TabbedMediaBlock = ({ slice }) => {
  console.log("slice me", slice);
  const client = createClient();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const [performanceData, setPerformanceData] = useState(null);

  const router = useRouter();

  console.log("primary slice", slice);

  // if (slice.variation === "allModelFeatures") then we should use a different useState for the outer tabs and control inner tabs with a new state variable
  // if the selected outer tab (selectedModel) changes then we need to set the state of the inner model (tabData)

  const [selectedModel, setSelectedModel] = useState(0);

  const [tabData, setTabData] = useState([]);

  const [usedCarCarousel, setUsedCarCarousel] = useState([]);

  const [setShowSwiper] = useState(true);

  const { isTabletSize, isMobileSize } = useResponsive();

  console.log("tabdata", tabData);

  console.log("slice data", slice);

  console.log("selected", tabData[selectedModel]);

  const getData = () => {
    let lang = window.location.href.includes("en-au") ? "en-au" : "ja-jp";
    if (slice.variation === "carModelFeatures" && slice.primary.model_id) {
      client
        .getByUID("model_carousel", slice.primary.model_id, {
          lang: lang,
        })
        .then((res) => {
          console.log("results for single model", res.data);
          // remove the first slice item if it is 'tour' because it is not needed here
          if (res.data.slices[0].primary.label === "tour") {
            res.data.slices.shift();
          }
          // remove performance data and set in it's own state
          if (res.data.slices.slice(-1)[0].slice_type === "performance_text") {
            const performanceData = res.data.slices.pop();
            setPerformanceData(performanceData);
          }
          // finally set the correct tab data
          setTabData(res.data.slices);
        });
    } else if (slice.variation === "allModelFeatures") {
      client
        .getByType("model_carousel", {
          lang: lang,
        })
        .then((res) => {
          console.log("results for all models", res.results);
          const selectedModelSlices = res.results[selectedModel].data.slices;
          if (
            selectedModelSlices.slice(-1)[0].slice_type === "performance_text"
          ) {
            const performanceDataforAllModels = res.results.map((item) =>
              item.data.slices.pop()
            );
            setPerformanceData(performanceDataforAllModels);
          }
          setTabData(res.results);
        });
    } else if (slice.variation === "withPopUpCards") {
      client
        .getByType("options_package", {
          lang: lang,
        })
        .then((res) => {
          console.log("results for options package", res.results);
          console.log("slice", slice.primary.option_type_id);

          const packages = res.results.find(
            (item) => item.data.option_type_id === slice.primary.option_type_id
          );

          setTabData(packages.data.slices);
        });
    } else if (slice.variation === "usedCarModel") {
      client.getByType("used_car_listing").then((res) => {
        console.log("results for used car", res.results);
        console.log("slice", slice.primary.model_id);

        const usedCar = res.results.find(
          (item) => item.uid === slice.primary.model_id
        );

        setUsedCarCarousel(usedCar.data.slices);
        setTabData(slice.items);
      });
    }
  };

  // this useEffect gets the data for the tabs depending on the slice variation so that data is not overfetched
  useEffect(() => {
    getData();
  }, []);

  // run again if the locale changes
  useEffect(() => {
    getData();
  }, [router.locale]);

  const handleItemSelect = () => {
    setShowSwiper(false);

    setTimeout(() => {
      setShowSwiper(true);
    }, 1);
  };

  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="padded-container my-10 "
      id={slice.primary?.anchor_link}
    >
      {slice.variation === "allModelFeatures" && (
        <TabbedMedia
          tabData={tabData}
          mainTitle={slice.primary.main_title}
          getText={(item) => item.data.tab_title}
          getSecondaryText={(item) => item.primary.title}
          onItemSelect={handleItemSelect}
          onSecondaryItemSelect={handleItemSelect}
          secondaryTabData={tabData[selectedModel]?.data.slices}
          activeTabIndex={selectedModel}
          secondaryActiveTabIndex={selectedIndex}
          setActiveTabIndex={setSelectedModel}
          setSecondaryActiveTabIndex={setSelectedIndex}
          popUpElements={tabData[selectedModel]?.data.slices.map(
            (slice, index) => {
              return slice.items.length <= 1 ? (
                <PopUpMedia
                  key={index}
                  video={true}
                  video_url={
                    tabData[selectedModel]?.data.slices[selectedIndex]?.primary
                      .you_tube_url
                  }
                  image={
                    tabData[selectedModel]?.data.slices[selectedIndex]?.primary
                      .poster_image
                  }
                >
                  <Video
                    videoUrl={
                      tabData[selectedModel]?.data.slices[selectedIndex]
                        ?.primary.you_tube_url
                    }
                  />
                </PopUpMedia>
              ) : null;
            }
          )}
          swiperElements={tabData[selectedModel]?.data.slices.map(
            (slice, index) => {
              return slice.items.length > 1 ? (
                <Swiper key={index} items={slice.items} fullWidth={false} />
              ) : null;
            }
          )}
        >
          <TabbedFeatureText
            text={tabData[selectedModel]?.data.slices[0]?.primary.text}
          />
          <TabbedFeatureText
            text={tabData[selectedModel]?.data.slices[1]?.primary.text}
          />
          <TabbedFeatureText
            text={tabData[selectedModel]?.data.slices[2]?.primary.text}
          />
          <PerformanceGrid
            items={performanceData && performanceData[selectedModel]?.items}
          />
        </TabbedMedia>
      )}

      {slice.variation === "carModelFeatures" && (
        <TabbedMedia
          tabData={tabData}
          mainTitle={slice.primary.main_title}
          getText={(item) => item.primary.title}
          onItemSelect={handleItemSelect}
          activeTabIndex={selectedModel}
          setActiveTabIndex={setSelectedModel}
          swiperElements={tabData?.map((slice, index) => {
            return slice.items.length > 1 ? (
              <Swiper key={index} items={slice.items} fullWidth={false} />
            ) : null;
          })}
        >
          <TabbedFeatureText text={tabData[0]?.primary.text} />
          <TabbedFeatureText text={tabData[1]?.primary.text} />
          <PerformanceGrid items={performanceData && performanceData.items} />
        </TabbedMedia>
      )}

      {slice.variation === "usedCarModel" && (
        <TabbedMedia
          tabData={slice.items}
          mainTitle={slice.primary.main_title}
          getText={(item) => item.tab_title}
          onItemSelect={handleItemSelect}
          activeTabIndex={selectedModel}
          setActiveTabIndex={setSelectedModel}
          usedCarModel={true}
          usedCarPrice={slice.primary.price}
          usedCarVanTourUrl={slice.primary.tour_embed_url}
          usedCarVanTourPosterImage={slice.primary.tour_poster_image}
          swiperElements={usedCarCarousel?.map((slice, index) => {
            return slice.items.length > 1 ? (
              <Swiper key={index} items={slice.items} fullWidth={false} />
            ) : null;
          })}
        >
          {tabData?.map((item, index) => {
            return <TabbedFeatureText key={index} text={item.tab_content} />;
          })}
        </TabbedMedia>
      )}

      {slice.variation === "withPopUpCards" && (
        <TabbedMedia
          tabData={tabData}
          mainTitle={slice.primary.main_title}
          getText={(item) => item.primary.title}
          activeTabIndex={selectedModel}
          setActiveTabIndex={setSelectedModel}
        >
          {isMobileSize() &&
            !isTabletSize() &&
            tabData[selectedModel] &&
            tabData.map((tab, index) => {
              return (
                <Accordian key={index}>
                  {tabData[index]?.items.map((item, index) => {
                    return (
                      <AccordianItem
                        key={index}
                        title={item.title}
                        contents={item.content}
                      >
                        <PrismicNextImage field={item.image} className="mt-6" />
                      </AccordianItem>
                    );
                  })}
                </Accordian>
              );
            })}
          {isTabletSize() &&
            tabData.map((tab, index) => {
              return (
                <div
                  key={index}
                  className="grid tablet:grid-cols-2 laptop:grid-cols-3 gap-y-10 laptop:gap-x-5 laptop:gap-y-12"
                  id={slice.primary?.anchor_link}
                >
                  {tab.items.map((item, index) => {
                    return (
                      <div key={index} className="w-[370px] h-[242px]">
                        <PopUpMedia
                          video={false}
                          image={item.image}
                          title={item.title}
                        >
                          <PackageFeatureItem item={item} />
                        </PopUpMedia>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </TabbedMedia>
      )}
    </section>
  );
};

export default TabbedMediaBlock;
