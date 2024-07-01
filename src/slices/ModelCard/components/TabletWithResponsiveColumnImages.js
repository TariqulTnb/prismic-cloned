import { ModelCardItem } from "./ModelCardItem";
import * as prismic from "@prismicio/client";
import { ModelFeatureImage } from "./ModelFeatureImage";
import { InfoBox } from "./InfoBox";

export const TabletWithResponsiveColumnImages = ({ slice }) => {
  return (
    <div className="grid grid-cols-2 gap-6 tablet:gap-8 laptop:gap-10 section-y-margin">
      {/* Model Cards start */}
      {prismic.isFilled.group(slice.items) &&
        slice.items.map((item, index) => {
          return <ModelCardItem item={item} key={`model_${index}`} />;
        })}
      <ModelFeatureImage
        imageProp={slice.items[0].image_1}
        textProp={slice.items[0].image_1_text}
        className="my-10"
      />
      <ModelFeatureImage
        imageProp={slice.items[1].image_1}
        textProp={slice.items[1].image_1_text}
        className="my-10"
      />
      <ModelFeatureImage
        imageProp={slice.items[0].image_2}
        textProp={slice.items[0].image_2_text}
      />
      <ModelFeatureImage
        imageProp={slice.items[1].image_2}
        textProp={slice.items[1].image_2_text}
      />
      <ModelFeatureImage
        imageProp={slice.items[0].image_3}
        textProp={slice.items[0].image_3_text}
      />
      <ModelFeatureImage
        imageProp={slice.items[1].image_3}
        textProp={slice.items[1].image_3_text}
      />
      <ModelFeatureImage
        imageProp={slice.items[0].image_4}
        textProp={slice.items[0].image_4_text}
      />
      <ModelFeatureImage
        imageProp={slice.items[1].image_4}
        textProp={slice.items[1].image_4_text}
      />
      <InfoBox item={slice.items[0]} />
      <InfoBox item={slice.items[1]} />
    </div>
  );
};
