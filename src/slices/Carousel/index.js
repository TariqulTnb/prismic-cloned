import React from "react";
import { Swiper } from "@/components/Swiper";
import clsx from "clsx";
// import required modules
/**
 * @typedef {import("@prismicio/client").Content.CarouselSlice} CarouselSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<CarouselSlice>} CarouselProps
 * @param {CarouselProps}
 */
const Carousel = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={clsx(
        slice.variation === "componentCarousel" && "section-y-margin-xl",
        "w-full"
      )}
    >
      <Swiper items={slice.items} />
    </section>
  );
};

export default Carousel;
