/**
 * @typedef {import("@prismicio/client").Content.MenuLinksSlice} MenuLinksSlice
 * @typedef {import("@prismicio/react").SliceComponentProps<MenuLinksSlice>} MenuLinksProps
 * @param {MenuLinksProps}
 */
const MenuLinks = ({ slice }) => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for menu_links (variation: {slice.variation}) Slices
    </section>
  );
};

export default MenuLinks;
