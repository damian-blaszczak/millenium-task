import { debounce } from "./debounce";

describe("debounce", () => {
  jest.useFakeTimers();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it("should cancel previous calls if called again before delay", () => {
    const mockCallback = jest.fn();
    const debouncedCallback = debounce(mockCallback, 500);

    debouncedCallback();
    debouncedCallback();
    debouncedCallback();

    jest.advanceTimersByTime(500);

    expect(mockCallback).toHaveBeenCalledTimes(1);
  });

  it("should call the function after the delay", () => {
    const mockCallback = jest.fn();
    const debouncedCallback = debounce(mockCallback, 500);

    debouncedCallback();
    jest.advanceTimersByTime(500);

    debouncedCallback();
    jest.advanceTimersByTime(500);

    expect(mockCallback).toHaveBeenCalledTimes(2);
  });
});
