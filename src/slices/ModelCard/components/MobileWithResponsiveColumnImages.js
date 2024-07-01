import { PrismicRichText } from "@/components/PrismicRichText";
import * as prismic from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/Common/Button";
import { ModelFeatureImage } from "./ModelFeatureImage";
import { InfoBox } from "./InfoBox";

// NOTE this component must only be rendered inside a mobile breakpoint - tailwind does not account for bigger viewports
export const MobileWithResponsiveColumnImages = ({ slice }) => {
  const [activeModel, setActiveModel] = useState(slice.items[0].model_id);

  const modelSelectedByButton = useRef(false);

  // const [manualScrolling, setManualScrolling] = useState(false);

  const getItemIndexFromModelId = (modelId) => {
    return slice.items.findIndex((item) => item.model_id === modelId);
  };

  const selectedItemObject = slice.items[getItemIndexFromModelId(activeModel)];

  const containerRef = useRef(null);

  // This scrolls based on the active model (e.g not based on scrolling)
  useEffect(() => {
    if (containerRef.current) {
      if (activeModel === "tama") {
        containerRef.current.scrollLeft = 0; // Scroll to the far left
      } else if (activeModel === "kumaQ") {
        containerRef.current.scrollLeft = containerRef.current.scrollWidth; // Scroll to the far right
      }

      setTimeout(() => {
        modelSelectedByButton.current = false;
      }, 500); // you may need to adjust the delay
    }
  }, [activeModel]);

  const models = slice.items.map((item) => item.model_id);

  const selectPreviousModel = () => {
    modelSelectedByButton.current = true;

    if (activeModel) {
      const currentIndex = models.indexOf(activeModel);
      if (currentIndex > 0) {
        setActiveModel(models[currentIndex - 1]);
      }
    }
  };

  const selectNextModel = () => {
    modelSelectedByButton.current = true;
    if (activeModel) {
      const currentIndex = models.indexOf(activeModel);
      if (currentIndex < models.length - 1) {
        setActiveModel(models[currentIndex + 1]);
      }
    }
  };

  // This sets the active model based on the users scrolling
  useEffect(() => {
    const currentContainer = containerRef.current;

    const handleScroll = () => {
      // this code should only be executed if the user is scrolling. If they click a button - don't execute
      if (modelSelectedByButton.current) {
        return;
      }
      const scrollPosition = currentContainer.scrollLeft;
      const halfScrollPosition =
        (currentContainer.scrollWidth - currentContainer.clientWidth) / 2;

      if (scrollPosition <= halfScrollPosition) {
        setActiveModel(slice.items[0].model_id);
      } else {
        setActiveModel(slice.items[1].model_id);
      }
    };

    if (currentContainer) {
      currentContainer.addEventListener("scroll", handleScroll);

      return () => {
        currentContainer.removeEventListener("scroll", handleScroll);
      };
    }
  });

  return (
    <>
      <div
        ref={containerRef}
        className="overflow-x-scroll tablet:overflow-visible flex no-scrollbar scroll-smooth tablet:flex tablet:flex-row gap-2 tablet:gap-8 section-y-margin"
      >
        {/* Model Cards start */}
        {/* iterate over the different models and render cards for each */}
        {prismic.isFilled.group(slice.items) &&
          slice.items.map((item, index) => {
            return (
              <div
                key={`model_${index}`}
                className={
                  "shrink-0 tablet:shrink-1 w-11/12 tablet:w-auto tablet:flex-1 px-4 rounded-md bg-menuBeigeDark py-8 tablet:py-4"
                }
              >
                {/* model title */}
                <div className="flex flex-col items-center">
                  <PrismicRichText
                    field={item.model_title}
                    components={{
                      heading2: ({ children }) => (
                        <h2 className="w-full tablet:w-auto tablet:inline text-center tablet:text-left font-bold text-[1.125rem] tablet:text-[1rem] ">
                          {children}
                        </h2>
                      ),
                    }}
                  />
                </div>
                {/* model image */}
                <div className="flex justify-center w-full tablet:px-10 laptop:px-16 desktop:px-20 xldesktop:px-48">
                  <PrismicNextImage
                    className="my-4 tablet:my-12"
                    field={item.model_image}
                  />
                </div>
                {/* text appears below the model image on mobile */}
                <PrismicRichText
                  field={item.model_description}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="text-center mx-10">{children}</p>
                    ),
                  }}
                />
              </div>
            );
          })}
      </div>
      {/* Menu to select model */}
      <div className="mt-8 h-16  bg-menuBeigeDark -mx-5 relative">
        <div className="flex justify-between w-full items-center h-full px-6">
          <button onClick={selectPreviousModel}>
            <svg
              width="14"
              height="21"
              viewBox="0 0 14 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.6081 0L14 3.18738L6.61211 10.5L14 17.8126L10.6081 21L0 10.5L10.6081 0Z"
                fill="#3B6552"
              />
            </svg>
          </button>
          <div className="flex justify-center flex-none">
            {prismic.isFilled.group(slice.items) &&
              slice.items.map((item, index) => {
                return (
                  <button
                    key={`model_${index}`}
                    className={clsx(
                      activeModel === item.model_id
                        ? "text-ddGreen font-bold"
                        : "font-normal text-black ",
                      "text-center text-[1.125rem] inline-block mx-4"
                    )}
                    onClick={() => {
                      modelSelectedByButton.current = true;
                      setActiveModel(item.model_id);
                    }}
                  >
                    <PrismicRichText
                      field={item.model_title}
                      components={{
                        heading2: ({ children }) => (
                          <h2
                            className={clsx(
                              activeModel === item.model_id
                                ? "text-ddGreen font-bold underline underline-offset-[8px] decoration-[4px] decoration-ddGreen"
                                : "font-normal text-black ",
                              "text-center text-[1.125rem] inline-block mx-4"
                            )}
                          >
                            {children}
                          </h2>
                        ),
                      }}
                    />
                  </button>
                );
              })}
          </div>
          <button onClick={selectNextModel}>
            <svg
              width="14"
              height="21"
              viewBox="0 0 14 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.39191 21L1.6287e-06 17.8126L7.38789 10.5L3.5012e-07 3.18738L3.39191 -9.7996e-07L14 10.5L3.39191 21Z"
                fill="#3B6552"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Model Feature Images */}
      <div className="mx-auto px-4 pt-10">
        <ModelFeatureImage
          imageProp={selectedItemObject.image_1}
          textProp={selectedItemObject.image_1_text}
        />
        <ModelFeatureImage
          imageProp={selectedItemObject.image_2}
          textProp={selectedItemObject.image_2_text}
        />
        <ModelFeatureImage
          imageProp={selectedItemObject.image_3}
          textProp={selectedItemObject.image_3_text}
        />
        <ModelFeatureImage
          imageProp={selectedItemObject.image_4}
          textProp={selectedItemObject.image_4_text}
        />
      </div>

      {/* Model Feature Info Text */}
      <InfoBox item={selectedItemObject} />

      {/* Model buttons */}
      <div className="mt-8 tablet:mt-0 flex flex-row justify-center items-center w-full gap-x-4 gap-y-4">
        <Button outline={true} link={selectedItemObject.outline_button_link}>
          <PrismicRichText
            field={selectedItemObject.outline_button_text}
            components={{
              paragraph: ({ children }) => <p className="">{children}</p>,
            }}
          />
        </Button>
        <Button link={selectedItemObject.primary_button_link}>
          <PrismicRichText
            field={selectedItemObject.primary_button_text}
            components={{
              paragraph: ({ children }) => <p className="">{children}</p>,
            }}
          />
        </Button>
      </div>
    </>
  );
};
