/**
 * @typedef {import("@prismicio/client").Content.FooterSocialIconsSlice} FooterSocialIconsSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<FooterSocialIconsSlice>} FooterSocialIconsProps
 * @param {FooterSocialIconsProps}
 */
const FooterSocialIcons = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for footer_social_icons (variation:{" "}
      {slice.variation}) Slices
    </section>
  );
};

export default FooterSocialIcons;
