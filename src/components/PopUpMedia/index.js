import { useState } from "react";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "../PrismicRichText";
import { PopUp } from "@/components/Common/PopUp";
import { WhiteButton } from "@/components/Common/WhiteButton";
import { noto, montserrat } from "@/lib/fonts";

export const PopUpMedia = ({
  children,
  image,
  video = false,
  title = null,
  communityOverlay = null,
  buttonText = null,
}) => {
  const [open, setOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // Add this line for hover state

  const handleClose = () => {
    setOpen(false);
    setIsHovered(false);
  };

  return (
    <>
      <div
        className={`w-full cursor-pointer relative ${noto.className} ${montserrat.className}`}
        onClick={() => !communityOverlay && setOpen(true)}
        onMouseEnter={() => setIsHovered(true)} // Add onMouseEnter handler
        onMouseLeave={() => setIsHovered(false)} // Add onMouseLeave handler
      >
        <div className="h-full w-full relative flex justify-center items-center">
          <PrismicNextImage field={image} />
          {/* if it's a video show play button */}
          {video && !communityOverlay && (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                width="159"
                height="159"
                className="h-16 w-16 tablet:w-24 tablet:h-24 laptop:h-32 laptop:w-32"
                viewBox="0 0 159 159"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="79.4006" cy="79.5374" r="79.3381" fill="white" />
                <path
                  d="M115.166 79.949L62.1367 110.565L62.1367 49.3326L115.166 79.949Z"
                  fill="#D9D9D9"
                />
              </svg>
            </div>
          )}
          {title && (
            <div
              style={{
                width: image.dimensions.width,
                height: image.dimensions.height,
              }}
              className="absolute inset-0 bg-cardDark"
            >
              <div className="h-full w-full flex flex-col justify-end pl-6 pb-6">
                <PrismicRichText
                  field={title}
                  components={{
                    heading2: ({ children }) => (
                      <h2 className="text-white">{children}</h2>
                    ),
                    paragraph: ({ children }) => (
                      <p className="text-white">{children}</p>
                    ),
                  }}
                />
              </div>
            </div>
          )}
          {/* Add communityOverlay when hovered */}
          {isHovered && communityOverlay && (
            <div
              className={`absolute inset-0 bg-opacity-0 hover:bg-[#198C85] hover:bg-opacity-80
              } transition duration-500 ease-in-out`}
            >
              <div className="flex flex-col justify-between h-full">
                <p className="text-white">{communityOverlay}</p>
                <WhiteButton
                  buttonText={buttonText}
                  setOpen={setOpen}
                  className="ml-6 mb-5"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <PopUp open={open} handleClose={handleClose}>
        {children}
      </PopUp>
    </>
  );
};
