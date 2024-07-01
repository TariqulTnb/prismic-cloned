import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage } from "@prismicio/next";
import clsx from "clsx";

export const ModelFeatureImage = ({ imageProp, textProp, className = "" }) => {
  return (
    <div className={clsx(`mx-auto`, className)}>
      <PrismicNextImage field={imageProp} className="mx-auto" />
      <PrismicRichText
        field={textProp}
        components={{
          paragraph: ({ children }) => (
            <p className="text-center my-3 max-w-md">{children}</p>
          ),
        }}
      />
    </div>
  );
};
