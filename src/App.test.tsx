import { screen, fireEvent, waitFor } from "@testing-library/react";
import App from "./App";
import { useInfinityScroll } from "./hooks";
import { useTransactions } from "./hooks/useTransactions";
import { debounce } from "./utils/debounce";
import { renderWithTheme } from "./testUtils";

const useTransactionsMock = {
  fetchTransactions: jest.fn(),
  addTransaction: jest.fn(),
  removeTransaction: jest.fn(),
  loading: false,
  removing: undefined,
  submitting: false,
  searching: false,
  balance: 1000,
  transactions: [
    {
      id: 1,
      description: "Transaction 1",
      amount: 100,
      date: "2024-09-18T06:41:46",
      beneficiary: "John Doe",
      account: "PL123",
      address: "Warsaw"
    }
  ],
  filteredTransactions: undefined,
  error: null
};

jest.mock("./hooks/useTransactions", () => ({
  useTransactions: jest.fn()
}));
jest.mock("./hooks/useInfinityScroll", () => ({
  useInfinityScroll: jest.fn()
}));
jest.mock("./utils/debounce", () => ({
  debounce: jest.fn()
}));

describe("App Component", () => {
  const mockLoaderRef = { current: document.createElement("div") };

  beforeEach(() => {
    (useTransactions as jest.Mock).mockReturnValue(useTransactionsMock);
    (useInfinityScroll as jest.Mock).mockImplementation(() => {});
    (debounce as jest.Mock).mockImplementation((fn) => fn);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders balance and transaction table", async () => {
    renderWithTheme(<App />);

    // Check if balance is displayed
    expect(screen.getByText("1000.00")).toBeInTheDocument();

    // Check if the transaction table renders
    await waitFor(() => {
      expect(
        screen.getByText(useTransactionsMock.transactions[0].description)
      ).toBeInTheDocument();
    });
    expect(
      screen.getByText(useTransactionsMock.transactions[0].beneficiary)
    ).toBeInTheDocument();
  });

  it("calls fetchTransactions when searching for a beneficiary", async () => {
    const fetchTransactionsMock = jest.fn();
    (useTransactions as jest.Mock).mockReturnValue({
      ...useTransactions(mockLoaderRef),
      fetchTransactions: fetchTransactionsMock
    });

    renderWithTheme(<App />);

    const searchInput = screen.getByLabelText("Search for Beneficiary");
    fireEvent.change(searchInput, { target: { value: "John" } });

    // Wait for the debounce to trigger fetchTransactions
    await waitFor(() => expect(fetchTransactionsMock).toHaveBeenCalledTimes(1));
    expect(fetchTransactionsMock).toHaveBeenCalledWith({
      beneficiary: "John",
      page: 1
    });
  });

  it("shows loading indicator when fetching transactions", () => {
    (useTransactions as jest.Mock).mockReturnValue({
      ...useTransactions(mockLoaderRef),
      loading: true
    });

    renderWithTheme(<App />);

    // Check if the Loader is rendered when loading is true
    expect(screen.getByLabelText("Loading content")).toBeInTheDocument();
  });

  it("displays error message when error occurs", () => {
    (useTransactions as jest.Mock).mockReturnValue({
      ...useTransactions(mockLoaderRef),
      error: "An error occurred"
    });

    renderWithTheme(<App />);

    // Check if the error message is displayed
    expect(screen.getByRole("alert")).toHaveTextContent(
      'Error occurred: "An error occurred"'
    );
  });

  it("adds aria attributes correctly for accessibility", () => {
    (useTransactions as jest.Mock).mockReturnValue({
      fetchTransactions: jest.fn(),
      addTransaction: jest.fn(),
      removeTransaction: jest.fn(),
      loading: true,
      removing: undefined,
      submitting: false,
      searching: false,
      balance: 1000,
      transactions: [
        {
          id: 1,
          description: "Transaction 1",
          amount: 100,
          date: "2024-09-18T06:41:46",
          beneficiary: "John Doe",
          account: "PL123",
          address: "Warsaw"
        }
      ],
      filteredTransactions: undefined,
      error: true
    });
    renderWithTheme(<App />);

    // Check if aria attributes are added for accessibility
    expect(screen.getByLabelText("Search for Beneficiary")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveAttribute("aria-live", "assertive");
    expect(screen.getByRole("status")).toHaveAttribute(
      "aria-label",
      "Loading content"
    );
  });
});
