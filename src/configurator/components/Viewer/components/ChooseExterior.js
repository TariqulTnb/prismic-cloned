import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSketchFab } from "@/hooks/useSketchfab";
import { PrismicRichText } from "@/components/PrismicRichText";
import { Button } from "@/components/Common/Button";

export const ChooseExterior = ({ slice, setCurrentStep }) => {
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

  const [optionIndex, setOptionIndex] = useState(findIndexOfQueryKeyInSlice());

  const { updateMaterials } = useSketchFab();

  // the order is wrong, it should in fact update the query key which should cause the query to re-fetch
  // what we are doing below is updating the query data, which is not the same as updating the query key

  const handleDivClick = async (idx) => {
    // const materialUid = queryClient.getQueryData([slice.items[idx].key_name]);
    console.log("this is the slice", slice);

    const jsonStr = slice.items[idx].color_albedo_pbr_value.replace(/'/g, '"');
    const colorsArray = JSON.parse(jsonStr);
    updateMaterials(
      JSON.parse(slice.primary.material_names),
      null,
      false,
      colorsArray
    ).then(() => {
      setOptionIndex(idx);
      queryClient.setQueryData(
        [slice.primary.model, "option", slice.primary.type],
        () => {
          return slice.items[idx].key_name;
        }
      );
    });
  };

  return (
    <div className="padded-container">
      <div className="flex justify-center mt-8">
        <PrismicRichText
          field={slice.primary.instruction}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-black mb-4 text-center">{children}</h2>
            ),
          }}
        />
      </div>
      <div className="flex mt-4 overflow-scroll w-full laptop:justify-center">
        {slice.items.map((item, idx) => {
          return (
            <div key={idx}>
              <div
                className="relative text-center mr-4 shrink-0 cursor-pointer w-36 h-28 rounded-md border"
                onClick={() => handleDivClick(idx)}
                style={{
                  backgroundColor: item.color_hex_value,
                }}
              >
                <input
                  className="absolute top-2 left-2 mr-2 h-6 w-6 text-ddGreen focus:ring-0"
                  type="radio"
                  name="seat_config"
                  id={`option_${idx}`}
                  value={idx}
                  checked={optionIndex === idx}
                  onChange={() => setOptionIndex(idx)}
                />
              </div>
              <PrismicRichText
                field={item.name}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-black text-[16px] my-2 text-center">
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
        <Button onClick={setCurrentStep} className="">
          <PrismicRichText field={slice.primary.next_step_text} />
        </Button>
      </div>
    </div>
  );
};
