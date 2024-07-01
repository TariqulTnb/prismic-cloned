import { PrismicRichText } from "@/components/PrismicRichText";
import { PrismicNextImage } from "@prismicio/next";
import { Button } from "@/components/Common/Button";

export const ModelCardWithImageLogoAndIcons = ({ slice, setCurrentStep }) => {
  console.log("model card slice", slice);

  console.log("set currentStep", setCurrentStep);
  return (
    <section
      className="padded-container section-y-margin-xl"
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <PrismicRichText
        field={slice.primary.main_title}
        components={{
          heading2: ({ children }) => (
            <h2 className="text-black mb-12 px-4 text-center">{children}</h2>
          ),
        }}
      />
      <div className="configurator-models-grid my-12">
        {slice.items.map((item, idx) => {
          return (
            <div key={idx} className="w-full mx-auto">
              <div className="configurator-individual-model-grid bg-menuBeigeDark mx-auto py-4 rounded-md w-full">
                <PrismicNextImage
                  className="max-w-[15rem] my-2 mx-auto"
                  field={item.title_image}
                />
                <PrismicRichText
                  field={item.model_description}
                  components={{
                    paragraph: ({ children }) => (
                      <p className="text-black my-2 px-12 text-center">
                        {children}
                      </p>
                    ),
                  }}
                />
                <PrismicNextImage
                  className="my-4 mx-auto px-10 tablet:px-4 max-w-[344px]"
                  field={item.model_image}
                />
                <div className="inline-block py-6 mx-auto">
                  <PrismicNextImage
                    className="mx-2 inline-block max-w-[50px] tablet:max-w-none"
                    field={item.icon_1}
                  />
                  <PrismicNextImage
                    className="mx-2 inline-block max-w-[50px] tablet:max-w-none"
                    field={item.icon_2}
                  />
                  <PrismicNextImage
                    className="mx-2 inline-block max-w-[50px] tablet:max-w-none"
                    field={item.icon_3}
                  />
                  <PrismicNextImage
                    className="mx-2 inline-block max-w-[50px] tablet:max-w-none"
                    field={item.icon_4}
                  />
                  <PrismicNextImage
                    className="mx-2 inline-block max-w-[50px] tablet:max-w-none"
                    field={item.icon_5}
                  />
                </div>
              </div>
              <div className="w-full my-8 px-8">
                <Button
                  onClick={() => setCurrentStep([item.link_key, "base_config"])}
                  className="w-full"
                >
                  <PrismicRichText
                    field={item.primary_button_text}
                    components={{
                      paragraph: ({ children }) => (
                        <p className="text-white my-2 px-12 text-center">
                          {children}
                        </p>
                      ),
                    }}
                  />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
