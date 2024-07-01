import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSketchFab } from "@/hooks/useSketchfab";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Button } from "@/components/Common/Button";
import { parseArrayString } from "../lib";
import { PrismicNextImage } from "@prismicio/next";

export const ChooseTyres = ({ slice, setCurrentStep }) => {
  const queryClient = useQueryClient();

  const findIndexOfQueryKeyInSlice = () => {
    console.log(
      "looking for query data with",
      slice.primary.model,
      "option",
      slice.primary.type
    );
    const keyInQueryCache = queryClient.getQueryData([
      slice.primary.model,
      "option",
      slice.primary.type,
    ]);

    console.log("key in query cache", keyInQueryCache);

    if (!keyInQueryCache) {
      console.log("no key in query cache for", slice.primary.type);
      return 0;
    }

    const index = slice.items.findIndex((item) => {
      return keyInQueryCache === item.key_name;
    });

    console.log("found index", index, slice.primary.type, keyInQueryCache);

    return index;
  };

  const [tyresIndex, setTyresIndex] = useState(findIndexOfQueryKeyInSlice());

  // the order is wrong, it should in fact update the query key which should cause the query to re-fetch
  // what we are doing below is updating the query data, which is not the same as updating the query key

  const { toggleNodes } = useSketchFab();

  const handleDivClick = async (idx) => {
    console.log("clicked", idx);

    const hideNodes = parseArrayString(slice.items[idx].hidenodenames);
    const showNodes = parseArrayString(slice.items[idx].shownodenames);

    await toggleNodes(hideNodes, false);
    await toggleNodes(showNodes, true);
    setTyresIndex(idx);

    queryClient.setQueryData(
      [slice.primary.model, "option", slice.primary.type],
      () => {
        return slice.items[idx].key_name;
      }
    );
  };

  return (
    <div className="padded-container">
      <div className="flex justify-center mt-8">
        <PrismicRichText
          field={slice.primary.instruction}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-black mb-4">{children}</h2>
            ),
          }}
        />
      </div>
      <div className="flex mt-4 overflow-scroll w-full justify-center">
        {slice.items.map((item, idx) => {
          return (
            <div
              key={idx}
              className="relative text-center mr-4 shrink-0 cursor-pointer"
              onClick={() => handleDivClick(idx)}
            >
              <input
                className="absolute top-2 left-2 mr-2 h-6 w-6 text-ddGreen focus:ring-0"
                type="radio"
                name="seat_config"
                id={`option_${idx}`}
                value={idx}
                checked={tyresIndex === idx}
                onChange={() => setTyresIndex(idx)}
              />
              <PrismicNextImage
                className="w-36 h-28  rounded-md"
                field={item.thumbnail}
              />
              <PrismicRichText
                field={item.name}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-black text-[16px] my-2 text-center max-w-[140px]">
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center mt-8">
        <Button onClick={setCurrentStep} className="mt-0">
          <PrismicRichText field={slice.primary.next_step_text} />
        </Button>
      </div>
    </div>
  );
};
