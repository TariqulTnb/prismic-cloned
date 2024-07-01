import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useSketchFab } from "@/hooks/useSketchfab";
import { parseArrayString } from "@/configurator/components/Viewer/lib";
import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage } from "@prismicio/next";
import { Button } from "@/components/Common/Button";

export const ChooseExternalOptions = ({ slice, setCurrentStep }) => {
  const queryClient = useQueryClient();

  const findIndexOfQueryKeyInSlice = () => {
    const keyNames = slice.items.map((item) => item.key_name);

    const externalOptionsArray = keyNames.map(
      (key) =>
        queryClient.getQueryData([slice.primary.model, "option", key]) || false
    );

    return externalOptionsArray;
  };

  const [externalOptions, setExternalOptions] = useState(
    findIndexOfQueryKeyInSlice()
  );

  // the order is wrong, it should in fact update the query key which should cause the query to re-fetch
  // what we are doing below is updating the query data, which is not the same as updating the query key

  const { toggleNodes } = useSketchFab();

  const handleChange = async (idx, show = true) => {
    const hideNodes = parseArrayString(slice.items[idx]?.hidenodenames);
    const showNodes = parseArrayString(slice.items[idx]?.shownodenames);

    if (show) {
      await toggleNodes(hideNodes, false);
      await toggleNodes(showNodes, true);
    } else {
      await toggleNodes(hideNodes, true);
      await toggleNodes(showNodes, false);
    }

    queryClient.setQueryData(
      [slice.primary.model, "option", slice.items[idx].key_name],
      () => {
        return !externalOptions[idx];
      }
    );

    setExternalOptions((prevState) => {
      const newState = [...prevState];
      newState[idx] = !prevState[idx];
      return newState;
    });
  };

  return (
    <div className="padded-container">
      <div className="mt-8">
        <PrismicRichText
          field={slice.primary.instruction}
          components={{
            heading2: ({ children }) => (
              <h2 className="text-black mb-4 text-center">{children}</h2>
            ),
            paragraph: ({ children }) => (
              <div className="flex justify-center w-full ">
                <p className="text-black my-2 max-w-[570px] text-[1rem]">
                  {children}
                </p>
              </div>
            ),
          }}
        />
      </div>
      <div className="flex mt-4 overflow-scroll w-full justify-center">
        {slice.items.map((item, idx) => {
          return (
            <div
              key={idx}
              className="relative text-center mr-4 shrink-0 cursor-pointer w-36 rounded-md my-1"
              onClick={() => handleChange(idx, !externalOptions[idx])}
            >
              <input
                className="absolute top-2 left-2 mr-2 h-6 w-6 text-ddGreen focus:ring-0 rounded-xs"
                type="checkbox"
                name="external_options"
                id={`option_${idx}`}
                value={idx}
                checked={externalOptions[idx]}
                onChange={() => handleChange(idx, !externalOptions[idx])}
              />
              <PrismicNextImage
                className="border-2 border-ddGreen rounded-xs"
                field={item.thumbnail}
              />
              <PrismicRichText
                field={item.name}
                components={{
                  paragraph: ({ children }) => (
                    <p className="text-black text-[16px] my-2 text-center max-w-[150px]">
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
          );
        })}
      </div>
      {setCurrentStep && (
        <div className="w-full flex justify-center mt-8">
          <Button onClick={setCurrentStep} className="mt-0">
            <PrismicRichText field={slice.primary.next_step_text} />
          </Button>
        </div>
      )}
    </div>
  );
};
