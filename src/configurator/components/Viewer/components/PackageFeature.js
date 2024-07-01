import { useState } from "react";
import { PopUp } from "@/components/Common/PopUp";
import { PrismicRichText } from "@/components/PrismicRichText";
import { PackageFeatureItem } from "@/slices/TabbedMediaBlock/components/PackageFeatureItem";

export const PackageFeature = ({ feature }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  return (
    <div className="flex items-center my-2">
      <PopUp open={open} handleClose={() => setOpen(false)}>
        <PackageFeatureItem item={feature} />
      </PopUp>
      <ul onClick={() => handleClick()} className="ml-5 list-outside">
        <PrismicRichText
          field={feature.title}
          components={{
            heading2: ({ children }) => (
              <li className="text-[#3B6552] cursor-pointer font-semibold list-disc text-[16px] text-left">
                {children}
              </li>
            ),
          }}
        />
      </ul>
    </div>
  );
};
