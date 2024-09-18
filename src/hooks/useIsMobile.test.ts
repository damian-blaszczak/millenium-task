import { renderHook, act } from "@testing-library/react";
import { useIsMobile } from "./useIsMobile";

const resizeWindow = (width: number) => {
  (window.innerWidth as number) = width;
  window.dispatchEvent(new Event("resize"));
};

describe("useIsMobile", () => {
  it("should return true when window width is less than the default breakpoint", () => {
    resizeWindow(500);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(true); // Should be mobile since width < 768 (default)
  });

  it("should return false when window width is greater than the default breakpoint", () => {
    resizeWindow(1024);

    const { result } = renderHook(() => useIsMobile());

    expect(result.current).toBe(false); // Should not be mobile since width > 768 (default)
  });

  it("should update isMobile value when window is resized", () => {
    const { result } = renderHook(() => useIsMobile());

    // Initially set window size to non-mobile
    act(() => {
      resizeWindow(1024);
    });

    expect(result.current).toBe(false); // Should be non-mobile

    // Simulate a resize to mobile size
    act(() => {
      resizeWindow(500);
    });

    expect(result.current).toBe(true); // Should be mobile after resize
  });

  it("should respect a custom breakpoint if provided", () => {
    resizeWindow(800);

    const { result } = renderHook(() => useIsMobile(900));

    expect(result.current).toBe(true); // Should be mobile since width < 900 (custom breakpoint)

    act(() => {
      resizeWindow(1000);
    });

    expect(result.current).toBe(false); // Should be non-mobile since width > 900
  });
});
