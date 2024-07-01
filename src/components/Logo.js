import * as prismic from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";

export const Logo = ({ settings, color, width }) => {
  return (
    <PrismicNextLink href="/">
      {prismic.isFilled.image(settings.data.logo) && (
        <PrismicNextImage
          width={parseInt(width)}
          field={
            color === "white" ? settings.data.logo_white : settings.data.logo
          }
        />
      )}
    </PrismicNextLink>
  );
};

Logo.defaultProps = {
  color: "black",
  width: 70,
};
