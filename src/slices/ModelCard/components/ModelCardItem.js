import { Button } from "@/components/Common/Button";
import { PrismicNextImage } from "@prismicio/next";
import { useResponsive } from "@/hooks/useResponsive";
import { PrismicRichText } from "@/components/PrismicRichText";

export const ModelCardItem = ({ item }) => {
  const { isMobileSize, isTabletSize } = useResponsive();

  return (
    <div className="px-6 rounded-md bg-menuBeigeDark py-6 tablet:py-4 flex flex-col justify-between">
      <div className="flex tablet:flex-row flex-col items-center">
        <PrismicRichText
          field={item.model_title}
          components={{
            heading2: ({ children }) => (
              <h2 className="w-full tablet:w-auto tablet:inline text-center tablet:text-left font-bold text-[1.125rem] tablet:text-[1rem] ">
                {children}
              </h2>
            ),
          }}
        />
        {/* on tablet and up text appears directly after the model title */}
        {isTabletSize() && (
          <>
            <span className="mx-2 align-middle">|</span>
            <PrismicRichText
              field={item.model_description}
              components={{
                paragraph: ({ children }) => (
                  <p className="inline">{children}</p>
                ),
              }}
            />
          </>
        )}
        {/* with default variation on mobile, text appears above the model image */}
        {isMobileSize() && (
          <>
            <PrismicRichText
              field={item.model_description}
              components={{
                paragraph: ({ children }) => (
                  <p className="text-center mx-10 my-2">{children}</p>
                ),
              }}
            />
          </>
        )}
      </div>
      {/* model image */}
      <div className="flex justify-center w-full px-6 tablet:px-14 laptop:px-16 desktop:px-20 xldesktop:px-32">
        <PrismicNextImage
          className="my-4 tablet:my-12"
          field={item.model_image}
        />
      </div>
      {/* Buttons in cards appearing on tablet and desktop */}
      <div className="mt-4 tablet:mt-0 flex flex-col items-center laptop:flex-row tablet:justify-end w-full gap-x-2 gap-y-4">
        <Button outline={true} link={item.outline_button_link}>
          <PrismicRichText
            field={item.outline_button_text}
            components={{
              paragraph: ({ children }) => <p className="">{children}</p>,
            }}
          />
        </Button>
        <Button link={item.primary_button_link}>
          <PrismicRichText
            field={item.primary_button_text}
            components={{
              paragraph: ({ children }) => <p className="">{children}</p>,
            }}
          />
        </Button>
      </div>
    </div>
  );
};
