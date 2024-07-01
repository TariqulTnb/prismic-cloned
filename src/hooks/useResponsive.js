import { useWindowSize } from "@uidotdev/usehooks";
import tailwindConfig from "@/../tailwind.config.js";

export function useResponsive() {
  const windowSize = useWindowSize();
  const tabletBreakpoint = tailwindConfig.theme.screens.tablet;
  const laptopBreakpoint = tailwindConfig.theme.screens.laptop;

  const isMobileSize = () => {
    return windowSize.width <= parseInt(tabletBreakpoint);
  };

  const isTabletSize = () => {
    return windowSize.width > parseInt(tabletBreakpoint);
  };

  const isLaptopSize = () => {
    return windowSize.width > parseInt(laptopBreakpoint);
  };

  return {
    isMobileSize,
    isTabletSize,
    isLaptopSize,
  };
}

export default useResponsive;
