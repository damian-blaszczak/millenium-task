import { renderHook } from "@testing-library/react";
import { act } from "react";
import { useTransactions } from "./useTransactions";
import {
  getTransactions,
  postTransaction,
  deleteTransaction
} from "../api/requests";

jest.mock("../api/requests");

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
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with the correct state", () => {
    const { result } = renderHook(() => useTransactions());

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

    const { result } = renderHook(() => useTransactions());

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

    const { result } = renderHook(() => useTransactions());

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
    const { result } = renderHook(() => useTransactions());

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

  it("should throw fetchTransactions error", async () => {
    const errorMessage = "Fetch error";

    (getTransactions as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useTransactions());

    let error: Error | undefined;
    await act(async () => {
      try {
        await result.current.fetchTransactions({ page: 1, beneficiary: "" });
      } catch (e) {
        error = e as Error;
      }
    });

    expect(error).toBeInstanceOf(Error);
    expect(error?.message).toBe(errorMessage);
    expect(result.current.error).toBe(errorMessage);
  });
});
