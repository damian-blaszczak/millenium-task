import { renderHook, act } from "@testing-library/react";
import { useTransactions } from "./useTransactions";
import { handleError } from "../utils/errorHandler";
import {
  getTransactions,
  postTransaction,
  deleteTransaction
} from "../api/requests";

jest.mock("../api/requests");
jest.mock("../utils/errorHandler");

const transactionMock = {
  id: 1,
  description: "Transaction 1",
  amount: 100,
  date: "2024-09-18T06:41:46",
  beneficiary: "John Doe",
  account: "PL123",
  address: "Warsaw"
};

// Mock API functions
const mockedGetTransactions = getTransactions as jest.MockedFunction<
  typeof getTransactions
>;
const mockedPostTransaction = postTransaction as jest.MockedFunction<
  typeof postTransaction
>;
const mockedDeleteTransaction = deleteTransaction as jest.MockedFunction<
  typeof deleteTransaction
>;

describe("useTransactions", () => {
  let loaderRef: React.RefObject<HTMLDivElement>;

  beforeEach(() => {
    loaderRef = { current: document.createElement("div") };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with the correct state", () => {
    const { result } = renderHook(() => useTransactions(loaderRef));

    expect(result.current.transactions).toEqual([]);
    expect(result.current.filteredTransactions).toBeUndefined();
    expect(result.current.loading).toBe(false);
    expect(result.current.submitting).toBe(false);
    expect(result.current.removing).toBeUndefined();
    expect(result.current.error).toBeUndefined();
    expect(result.current.searching).toBe(false);
    expect(result.current.balance).toBe(0);
  });

  it("should handle fetchTransactions correctly", async () => {
    mockedGetTransactions.mockResolvedValue([transactionMock]);

    const { result } = renderHook(() => useTransactions(loaderRef));

    await act(async () => {
      await result.current.fetchTransactions({ page: 1, beneficiary: "" });
    });

    expect(mockedGetTransactions).toHaveBeenCalledWith({
      page: 1,
      beneficiary: ""
    });
    expect(result.current.transactions).toEqual([transactionMock]);
    expect(result.current.loading).toBe(false);
  });

  it("should handle addTransaction correctly", async () => {
    const newTransaction = { ...transactionMock, id: 2, amount: 200 };
    mockedPostTransaction.mockResolvedValue(newTransaction);

    const { result } = renderHook(() => useTransactions(loaderRef));

    await act(async () => {
      await result.current.addTransaction(newTransaction);
    });

    expect(mockedPostTransaction).toHaveBeenCalledWith(newTransaction);
    expect(result.current.transactions).toContain(newTransaction);
  });

  it("should handle removeTransaction correctly", async () => {
    const transactionIdToRemove = 1;
    mockedDeleteTransaction.mockResolvedValue(undefined);

    // Setup initial transactions
    mockedGetTransactions.mockResolvedValue([transactionMock]);
    const { result } = renderHook(() => useTransactions(loaderRef));

    await act(async () => {
      await result.current.fetchTransactions({ page: 1, beneficiary: "" });
    });

    expect(result.current.transactions).toEqual([transactionMock]);

    await act(async () => {
      await result.current.removeTransaction(transactionIdToRemove);
    });

    expect(mockedDeleteTransaction).toHaveBeenCalledWith(transactionIdToRemove);
    expect(result.current.transactions).toHaveLength(0);
  });

  it("should handle errors gracefully", async () => {
    const errorMessage = "An error occurred";
    mockedGetTransactions.mockRejectedValue(new Error(errorMessage));
    (handleError as jest.Mock).mockImplementation(() => {});

    const { result } = renderHook(() => useTransactions(loaderRef));

    await act(async () => {
      await result.current.fetchTransactions({ page: 1, beneficiary: "" });
    });

    expect(handleError).toHaveBeenCalledWith(new Error(errorMessage));
    expect(result.current.error).toBe(errorMessage);
  });
});
