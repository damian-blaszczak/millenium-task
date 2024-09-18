import { useLayoutEffect, useState } from "react";
import { theme } from "../theme";

export const useIsMobile = (breakpoint?: number): boolean => {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const updateSize = (): void => {
      setIsMobile(window.innerWidth < (breakpoint || theme.breakpoint.md));
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return (): void => window.removeEventListener("resize", updateSize);
  }, [breakpoint]);

  return isMobile;
};
