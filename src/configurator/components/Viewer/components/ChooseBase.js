import { PerformanceGrid } from "@/components/PerformanceGrid";
import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage } from "@prismicio/next";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/Common/Button";
import { useEffect, useState } from "react";
import { clsx } from "clsx";

export const ChooseBase = ({
  performanceSlice,
  baseSlice,
  setCurrentStep,
  model,
}) => {
  const queryClient = useQueryClient();

  const [roofStep, setRoofStep] = useState(true);

  const findIndexOfQueryKeyInSlice = () => {
    console.log("looking for query data with", model, baseSlice.primary.type);
    const keyInQueryCache = queryClient.getQueryData([
      model,
      baseSlice.primary.type,
    ]);

    console.log("key in query cache", keyInQueryCache);

    if (!keyInQueryCache) {
      console.log("no key in query cache for", baseSlice.primary.type);
      return 0;
    }

    const index = baseSlice.items.findIndex((item) => {
      return keyInQueryCache === item.key_name;
    });

    console.log("found index", index, baseSlice.primary.type, keyInQueryCache);

    return index;
  };

  const [baseConfigIndex, setBaseConfigIndex] = useState(
    findIndexOfQueryKeyInSlice()
  );

  let iterableItems;

  console.log("model is...", model);

  if (model === "tama" && !roofStep) {
    const sortedItems = [...baseSlice.items].sort(
      (a, b) => a.price_in_yen - b.price_in_yen
    );

    const distinctItems = sortedItems.filter((item, index, self) => {
      return self.findIndex((i) => i.key_name === item.key_name) === index;
    });

    iterableItems = distinctItems.slice(0, 3);

    console.log("iterable items tama after slicing");
  } else if (model === "tama") {
    iterableItems = baseSlice.items.filter((item, index, self) => {
      return (
        self.findIndex((i) => i.roof_type_key === item.roof_type_key) === index
      );
    });
    console.log("iterable items no roof step", iterableItems);
  } else {
    iterableItems = baseSlice.items;
  }

  useEffect(() => {
    if (model === "tama") {
      setRoofStep(true);
    }
  }, []);

  // if query key is in cache then select that index
  const [roofIndex, setRoofIndex] = useState(() => {
    const keyInQueryCache = queryClient.getQueryData([model, "roof"]);
    if (keyInQueryCache) {
      return iterableItems.findIndex(
        (el) => el.roof_type_key === keyInQueryCache
      );
    } else {
      return 0;
    }
  });

  useEffect(() => {
    if ((model === "kumaq" && iterableItems) || (!roofStep && iterableItems)) {
      queryClient.setQueryData(
        [model, "baseConfig"],
        iterableItems[baseConfigIndex].key_name
      );
    }
  }, [baseConfigIndex]);

  useEffect(() => {
    if (model === "tama" && roofStep) {
      queryClient.setQueryData(
        [model, "roof"],
        iterableItems[roofIndex].roof_type_key
      );
    }
  }, [roofIndex]);

  const handleDivClick = (idx) => {
    if (model === "tama" && roofStep) {
      setRoofIndex(idx);
    } else {
      setBaseConfigIndex(idx);
    }
  };

  const nextStepText = () => {
    if (model === "tama") {
      if (roofStep) {
        return baseSlice.primary.roof_step_text;
      } else {
        return baseSlice.primary.next_step_text;
      }
    } else {
      return baseSlice.primary.next_step_text;
    }
  };

  const setNextStep = () => {
    if (model === "tama") {
      if (roofStep) {
        setRoofStep(false);
      } else {
        setCurrentStep([model, baseSlice.primary.next_step_link]);
      }
    } else {
      setCurrentStep([model, baseSlice.primary.next_step_link]);
    }
  };

  const determineCardTypeToRender = (item, idx) => {
    if (model === "tama" && roofStep) {
      return (
        <div
          key={idx}
          className="relative py-2 border rounded-md border-[#D0D0D0] bg-menuBeigeDark cursor-pointer hover:bg-[#D1CCC5]"
          onClick={() => handleDivClick(idx)}
        >
          <input
            className="absolute top-2 left-2 mr-2 h-6 w-6 text-ddGreen focus:ring-0"
            type="radio"
            name="base_config"
            id={`option_${idx}`}
            value={idx}
            checked={roofIndex === idx}
            onChange={() => setRoofIndex(idx)}
          />
          <div className="flex flex-col h-full items-center justify-between">
            <PrismicRichText
              components={{
                paragraph: ({ children }) => <p className="mb-2">{children}</p>,
              }}
              field={item.roof_type}
            />
            <div className="flex items-center flex-1 h-full">
              <PrismicNextImage
                className="max-w-[270px]"
                field={item.roof_type_image}
              />
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div
          key={idx}
          className="min-w-[200px] relative p-2 border rounded-md border-[#D0D0D0] bg-menuBeigeDark cursor-pointer hover:bg-[#D1CCC5]"
          onClick={() => handleDivClick(idx)}
        >
          <input
            className="absolute top-2 left-2 mr-2 h-6 w-6 text-ddGreen focus:ring-0"
            type="radio"
            name="base_config"
            id={`option_${idx}`}
            value={idx}
            checked={baseConfigIndex === idx}
            onChange={() => setBaseConfigIndex(idx)}
          />
          <div className="flex items-center justify-center">
            <PrismicRichText
              components={{
                paragraph: ({ children }) => <p className="mb-2">{children}</p>,
              }}
              field={item.title}
            />
          </div>
          <PrismicRichText
            field={item.price_in_yen}
            components={{
              paragraph: ({ children }) => (
                <p className="text-base mb-4">{children}</p>
              ),
            }}
          />
          <PrismicRichText
            components={{
              paragraph: ({ children }) => <p className="mb-2">{children}</p>,
            }}
            field={item.passengers_option}
          />
          <PrismicRichText
            components={{
              paragraph: ({ children }) => <p className="mb-4">{children}</p>,
            }}
            field={item.seats_option}
          />
        </div>
      );
    }
  };

  console.log(
    "iterable items",
    iterableItems,
    "roof index",
    roofIndex,
    "config index",
    baseConfigIndex
  );

  return (
    <div className="padded-container">
      <div className="section-y-margin laptop:py-10">
        <div className="flex flex-col tablet:flex-row w-max mx-auto gap-10 laptop:gap-12">
          <div className="mx-auto">
            <div className="flex justify-center w-full">
              <PrismicNextImage
                className="max-w-[270px] pb-2"
                field={performanceSlice.primary.title_image}
              />
            </div>
            <div className="flex justify-center">
              <PrismicNextImage
                className="max-w-[270px]"
                field={performanceSlice.primary.van_image}
              />
            </div>
          </div>
          <div className="max-w-[300px] tablet:max-w-none">
            <PrismicRichText
              field={performanceSlice.primary.title}
              components={{
                heading2: ({ children }) => (
                  <h2 className="text-[20px]">{children}</h2>
                ),
              }}
            />
            <PerformanceGrid items={performanceSlice.items} />
          </div>
        </div>
      </div>
      <div className="section-y-margin">
        <div className="w-full text-center">
          <PrismicRichText
            field={
              roofStep ? baseSlice.primary.roof_title : baseSlice.primary.title
            }
          />
          <div className="overflow-auto no-scrollbar">
            <div
              className={clsx(
                iterableItems.length === 2 &&
                  "grid-cols-[repeat(2,_minmax(250px,_400px))] tablet:justify-center",
                iterableItems.length === 3 &&
                  "grid-cols-[repeat(3,_minmax(200px,_1fr))] w-full",
                iterableItems.length === 4 &&
                  "grid-cols-[repeat(4,_minmax(200px,_1fr))] w-full",
                `grid grid-rows-1 gap-10 mt-10`
              )}
            >
              {iterableItems?.length > 0 &&
                iterableItems.map((item, idx) =>
                  determineCardTypeToRender(item, idx)
                )}
            </div>
          </div>
          <Button onClick={setNextStep} className="mt-10 tablet:mt-20">
            <PrismicRichText field={nextStepText()} />
          </Button>
        </div>
      </div>
    </div>
  );
};
