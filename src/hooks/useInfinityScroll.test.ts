import { renderHook, act } from "@testing-library/react";
import { useInfinityScroll } from "./useInfinityScroll";

const transactionMock = {
  id: 1,
  description: "Transaction 1",
  amount: 100,
  date: "2024-09-18T06:41:46",
  beneficiary: "John Doe",
  account: "PL123",
  address: "Warsaw"
};

describe("useInfinityScroll", () => {
  const mockFetchTransactions = jest.fn();
  const mockLoaderRef = { current: document.createElement("div") };

  beforeEach(() => {
    window.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
      trigger: (isIntersecting: boolean) => callback([{ isIntersecting }])
    }));
  });

  beforeAll(() => {
    jest.clearAllMocks();
  });

  it("should call fetchTransactions when loader is intersecting and not loading", async () => {
    mockFetchTransactions.mockResolvedValue([transactionMock]);

    renderHook(() =>
      useInfinityScroll({
        loaderRef: mockLoaderRef,
        loading: false,
        fetchTransactions: mockFetchTransactions,
        filteredTransactions: undefined
      })
    );

    const observerInstance = (window.IntersectionObserver as jest.Mock).mock
      .results[0].value;

    act(() => {
      observerInstance.trigger(true); // Simulate loader being in the viewport
    });

    await act(async () => {
      await mockFetchTransactions();
    });

    expect(mockFetchTransactions).toHaveBeenCalledTimes(1);
  });

  it("should not call fetchTransactions if filteredTransactions exist", () => {
    renderHook(() =>
      useInfinityScroll({
        loaderRef: mockLoaderRef,
        loading: false,
        fetchTransactions: mockFetchTransactions,
        filteredTransactions: [transactionMock]
      })
    );

    const observerInstance = (window.IntersectionObserver as jest.Mock).mock
      .results[0].value;

    act(() => {
      observerInstance.trigger(true); // Simulate loader being in the viewport
    });

    expect(mockFetchTransactions).not.toHaveBeenCalled();
  });

  it("should not fetch when already loading", async () => {
    renderHook(() =>
      useInfinityScroll({
        loaderRef: mockLoaderRef,
        loading: true,
        fetchTransactions: mockFetchTransactions,
        filteredTransactions: undefined
      })
    );

    const observerInstance = (window.IntersectionObserver as jest.Mock).mock
      .results[0].value;

    act(() => {
      observerInstance.trigger(true); // Simulate loader being in the viewport
    });

    expect(mockFetchTransactions).not.toHaveBeenCalled();
  });
});
