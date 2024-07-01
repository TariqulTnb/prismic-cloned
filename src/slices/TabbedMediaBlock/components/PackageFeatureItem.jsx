import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@/components/PrismicRichText";

export const PackageFeatureItem = ({ item }) => {
  return (
    <div className="w-full rounded-lg p-6 flex">
      <div className="flex-none">
        <PrismicNextImage field={item.image} />
      </div>
      <div className="ml-10 flex-1">
        <PrismicRichText field={item.title} className="ml-4" />
        <PrismicRichText
          field={item.content}
          className="ml-4"
          fullWidth={true}
        />
      </div>
    </div>
  );
};
