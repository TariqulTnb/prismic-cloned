import React, { useRef, useState, useEffect } from "react";
import { register } from "swiper/element/bundle";
import * as prismic from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText } from "@/components/PrismicRichText";
import { useResponsive } from "@/hooks/useResponsive";
import clsx from "clsx";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export function Swiper({ items, fullWidth = true }) {
  const swiperRef = useRef(null);
  const { isMobileSize, isTabletSize } = useResponsive();

  const [slideIndex, setSlideIndex] = useState(0);

  const fullWidthStyles = `
  @media (min-width: 480px) {
    .swiper-button-prev, .swiper-button-next {
      top: 50%;
    }

    .swiper-button-prev {
      background-image: url("/Carousel/swiper_button_previous.svg");
      left: 50px;
    }

    .swiper-button-next {
        background-image: url("/Carousel/swiper_button_next.svg");
        right: 50px;
    }

    .swiper-pagination-bullet {
      background-color: rgba(255, 255, 255, 1);
      width: 10px;
      height: 10px;
    }

    .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
      margin: 20px var(--swiper-pagination-bullet-horizontal-gap,4px);
    }
  }
`;

  const mobileStyles = `
  .swiper-pagination-bullet {
    width: 10px;
    height: 10px;
  }

  .swiper-pagination-bullet-active {
     background-color: rgba(1, 1, 1, 1);
  }

  .swiper-button-prev, .swiper-button-next {
    width: 15px;
    top: auto;
    bottom: 0px;
  }

  .swiper-button-prev {
    background-image: url("/Carousel/mobile_swiper_button_previous.svg");
    left: 20px;
  }

  .swiper-button-next {
    background-image: url("/Carousel/mobile_swiper_button_next.svg");
    right: 20px;
  }

  .swiper-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    bottom: 13px;
  }`;

  const fullWidthMobileStyles = `
     @media (max-width: 479px) {
        ${mobileStyles}
      }
  `;

  useEffect(() => {
    // Register Swiper web component
    register();

    // Object with parameters
    const params = {
      injectStyles: [
        `
      :host(swiper-container) {
        margin: 0 0;
      }

      .swiper-button-prev > svg,
      .swiper-button-next > svg {
        display: none;
      }

      .swiper-button-prev, .swiper-button-next {
        background-repeat: no-repeat;
        background-size: 100% auto;
        position: absolute;
        background-position: center;
        z-index: 20;
      }

      ${fullWidth && fullWidthStyles}
      
      ${fullWidth ? fullWidthMobileStyles : mobileStyles}
          `,
      ],
      spaceBetween: 30,
      loop: true,
      centeredSlides: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      initialSlide: 0,
      pagination: {
        clickable: true,
      },
      navigation: true,
      modules: [Autoplay, Pagination, Navigation],
      className: clsx(!fullWidth && "w-full laptop:max-w-md"),
      on: {
        slideChange(s) {
          setSlideIndex(s.realIndex);
        },
      },
    };

    // Assign it to swiper element
    const swiperInstance = Object.assign(swiperRef.current, params);

    // initialize swiper
    swiperInstance.initialize();

    return () => {
      console.log("unmounted!");
    };

    // console.log("instance", swiperInstance.swiper);
  }, []);

  return (
    <div className="">
      <swiper-container init="false" ref={swiperRef}>
        {prismic.isFilled.group(items) &&
          items.map((item, index) => (
            <swiper-slide key={`carousel_image_${index}`}>
              <PrismicNextImage
                key={`carousel_image_${index}`}
                field={item.image}
                className="w-full h-full object-cover"
              ></PrismicNextImage>
              {/* for mobile OR !fullWidth */}
              {((isMobileSize() && !isTabletSize()) || !fullWidth) && (
                <div className="h-16 w-full"></div>
              )}
            </swiper-slide>
          ))}
      </swiper-container>
      <div
        className={clsx(
          fullWidth ? "laptop:mt-8" : "",
          "mt-4 w-full flex justify-center h-16"
        )}
      >
        <PrismicRichText
          field={items[slideIndex].subtitle}
          components={{
            paragraph: ({ children }) => (
              <p className="text-center tablet:max-w-[400px]">{children}</p>
            ),
          }}
        />
      </div>
    </div>
  );
}
