import { useEffect, useState } from "react";
import { PrismicRichText } from "@/components/PrismicRichText";
import { useQueryClient } from "@tanstack/react-query";
import { useSketchFab } from "@/hooks/useSketchfab";
import { Button } from "@/components/Common/Button";
import { PrismicNextImage } from "@prismicio/next";

export const ChooseMaterials = ({ slice, setCurrentStep, currentStep }) => {
  const queryClient = useQueryClient();

  console.log("slice in choose materials", slice);

  const findIndexOfQueryKeyInSlice = () => {
    const keyInQueryCache = queryClient.getQueryData([
      slice.primary.model,
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

  useEffect(() => {
    setMaterialIndex(findIndexOfQueryKeyInSlice());
  }, [currentStep]);

  const [materialIndex, setMaterialIndex] = useState(
    findIndexOfQueryKeyInSlice()
  );

  const { updateMaterials } = useSketchFab();

  const handleDivClick = async (idx) => {
    const materialUid = queryClient.getQueryData([slice.items[idx].key_name]);
    updateMaterials(JSON.parse(slice.primary.material_names), materialUid).then(
      () => {
        setMaterialIndex(idx);
        queryClient.setQueryData(
          [slice.primary.model, slice.primary.type],
          () => {
            return slice.items[idx].key_name;
          }
        );
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
              <h2 className="text-black mb-4 text-center">{children}</h2>
            ),
          }}
        />
      </div>
      <div className="flex mt-4 overflow-auto no-scrollbar w-full tablet:justify-center">
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
                checked={materialIndex === idx}
                onChange={() => setMaterialIndex(idx)}
              />
              <PrismicNextImage
                className="w-36 h-28  rounded-md"
                field={item.thumbnail}
              />
              <PrismicRichText
                field={item.name}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-black text-[16px] my-2">{children}</p>
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
