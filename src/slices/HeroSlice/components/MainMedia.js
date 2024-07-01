import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@/components/PrismicRichText";
import * as prismic from "@prismicio/client";
import clsx from "clsx";
import { useResponsive } from "@/hooks/useResponsive";
import { useContext, useEffect } from "react";
import HeroHeightContext from "@/components/HeroHeightContext";

export const MainMedia = ({ slice, children }) => {
  const { isTabletSize, isMobileSize, isLaptopSize } = useResponsive();
  const { heroRef, setHeroHeight, heroHeight } = useContext(HeroHeightContext);

  useEffect(() => {
    if (heroRef.current && heroHeight !== heroRef.current.offsetHeight) {
      setHeroHeight(heroRef.current.offsetHeight);
      console.log("hero ref height is now", heroRef.current.offsetHeight);
    }
    // document.body.style.backgroundPosition = `center ${heroHeight}px`;
  }, [heroRef, setHeroHeight, heroHeight]);

  console.log("variation", slice.variation);
  console.log("slice in main media", slice);

  const getImage = () => {
    if (isLaptopSize()) {
      return slice.primary.image;
    } else if (isTabletSize()) {
      return slice.primary.image.Tablet;
    } else if (isMobileSize()) {
      return slice.primary.image.Mobile;
    } else {
      return slice.primary.image;
    }
  };

  // the height should be the height of the winodw, minus nav bar, minus the height of the top text

  return (
    <>
      <div
        ref={heroRef}
        className={clsx(
          "relative laptop:w-full",
          slice.variation !== "modelHero" &&
            slice.variation !== "mobileSmall" &&
            "h-[60vh] laptop:h-auto"
        )}
      >
        {prismic.isFilled.image(slice.primary?.image) && (
          <>
            <PrismicNextImage
              field={getImage() ?? slice.primary.image}
              size="100vw"
              className="w-full object-cover h-full"
            />
            <div
              className={clsx(
                slice.primary.background_gradient && "bg-heroDark",
                "absolute inset-0"
              )}
            >
              {children}
            </div>
          </>
        )}
        {prismic.isFilled.keyText(slice.primary?.video_url) && (
          <>
            <video
              className="object-cover w-full h-full"
              loop
              autoPlay
              playsInline
              muted
              poster={slice.primary.poster_frame.url}
            >
              <source src={slice.primary.video_url} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div
              className={clsx(
                slice.primary.darken_video ? "bg-videoHeroDark" : null,
                "absolute inset-0"
              )}
            >
              {children}
            </div>
          </>
        )}
      </div>

      {prismic.isFilled.image(slice.primary?.inner_image) && (
        <div
          ref={heroRef}
          className={clsx(
            slice.primary.background_pattern &&
              "bg-mainPattern bg-[size:100%] bg-no-repeat",
            "p-5 relative w-full",
            slice.variation === "modelHero"
              ? "tablet:pb-24 pb-10 pl-5 pt-5 pr-5"
              : "p-5",
            slice.variation === "modelHero" && slice.primary.background_pattern
              ? "bg-modelHeroGreen"
              : slice.primary.background_pattern && "bg-heroGreen"
          )}
        >
          {isTabletSize() && slice.variation === "modelHero" && (
            <TopModelInfo slice={slice} />
          )}
          <PrismicNextImage
            field={slice.primary.inner_image}
            className="laptop:max-w-3xl mx-auto px-10"
          />

          {isTabletSize() && slice.variation === "modelHero" && (
            <BottomModelInfo slice={slice} />
          )}
        </div>
      )}
      {isMobileSize() && <TopModelInfo slice={slice} />}
      {isMobileSize() && slice.variation === "modelHero" && (
        <BottomModelInfo slice={slice} />
      )}
    </>
  );
};

const TopModelInfo = ({ slice }) => {
  return (
    <>
      {prismic.isFilled.image(slice.primary?.top_logo) && (
        <PrismicNextImage
          field={slice.primary.top_logo}
          className="mx-auto max-w-[220px] mt-5 tablet:mt-0"
        />
      )}
      {prismic.isFilled.richText(slice.primary?.model_title) && (
        <PrismicRichText
          field={slice.primary.model_title}
          components={{
            paragraph: ({ children }) => (
              <div className="my-2 flex justify-center">
                <p className="tablet:text-white text-black font-bold text-center px-4">
                  {children}
                </p>
              </div>
            ),
          }}
        />
      )}
    </>
  );
};

const BottomModelInfo = ({ slice }) => {
  const { isMobileSize } = useResponsive();

  const calculateOrder = (index) => {
    if (isMobileSize() && index === 2) {
      return "order-last col-span-4";
    }
  };

  return (
    <div className="tablet:flex tablet:flex-row tablet:justify-between grid tablet:grid-cols-5 grid-cols-4 max-w-5xl laptop:max-w-6xl my-5 tablet:mb-0 tablet:mx-auto mx-2">
      {prismic.isFilled.group(slice.items) &&
        slice.items.map((item, index) => {
          return (
            <div
              className={clsx(calculateOrder(index), "mx-auto text-center")}
              key={`statistic_${index}`}
            >
              <PrismicRichText
                field={item.statistic_info}
                components={{
                  heading1: ({ children }) => (
                    <h1 className="tablet:text-white text-black text-[2.80rem] tablet:text-[3.25rem] laptop:text-[4.25rem] desktop:text-[4.8rem] break-keep">
                      {children}
                    </h1>
                  ),
                  paragraph: ({ children }) => (
                    <p className="tablet:text-white text-black laptop:text-sm tablet:text-xs mt-2 px-2">
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
          );
        })}
    </div>
  );
};
