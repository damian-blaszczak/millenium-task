import { useCallback, useMemo, useReducer } from "react";
import { IGetTransactionsParams, ITransaction } from "../types";
import { handleError, removeDuplicates } from "../utils";
import {
  deleteTransaction,
  getTransactions,
  postTransaction
} from "../api/requests";

type TransactionState = {
  transactions: ITransaction[];
  filteredTransactions?: ITransaction[];
  loading: boolean;
  submitting: boolean;
  removing?: number;
  error?: string;
  searching: boolean;
};

type TransactionAction =
  | { type: "FETCH_START"; beneficiary?: string }
  | { type: "FETCH_SUCCESS"; payload: ITransaction[]; beneficiary?: string }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "ADD_TRANSACTION"; payload: ITransaction }
  | { type: "REMOVE_TRANSACTION"; payload: number }
  | { type: "SUBMIT_START" }
  | { type: "SUBMIT_END" }
  | { type: "REMOVE_START"; payload: number }
  | { type: "REMOVE_END"; payload: number }
  | { type: "REMOVE_ERROR"; payload: number };

const initialState: TransactionState = {
  transactions: [],
  loading: false,
  submitting: false,
  searching: false
};

const transactionReducer = (
  state: TransactionState,
  action: TransactionAction
): TransactionState => {
  switch (action.type) {
    case "FETCH_START":
      return {
        ...state,
        loading: true,
        error: undefined,
        searching: Boolean(action.beneficiary)
      };
    case "FETCH_SUCCESS":
      if (action.beneficiary) {
        return {
          ...state,
          filteredTransactions: action.payload,
          loading: false,
          searching: false
        };
      }
      return {
        ...state,
        transactions: removeDuplicates([
          ...state.transactions,
          ...action.payload
        ]),
        filteredTransactions: undefined,
        loading: false
      };
    case "FETCH_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
        searching: false
      };
    case "ADD_TRANSACTION":
      return {
        ...state,
        transactions: [action.payload, ...state.transactions]
      };
    case "SUBMIT_START":
      return { ...state, submitting: true };
    case "SUBMIT_END":
      return { ...state, submitting: false };
    case "REMOVE_START":
      return { ...state, removing: action.payload };
    case "REMOVE_END":
      return {
        ...state,
        removing: undefined,
        transactions: state.transactions.filter((t) => t.id !== action.payload)
      };
    case "REMOVE_ERROR":
      return {
        ...state,
        removing: undefined
      };
    default:
      return state;
  }
};

export const useTransactions = () => {
  const [state, dispatch] = useReducer(transactionReducer, initialState);

  const balance = useMemo(() => {
    const transactions = state.filteredTransactions || state.transactions;
    return transactions.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );
  }, [state.transactions, state.filteredTransactions]);

  const fetchTransactions = useCallback(
    async ({ page, beneficiary }: IGetTransactionsParams) => {
      dispatch({ type: "FETCH_START", beneficiary });

      try {
        const newTransactions = await getTransactions({ page, beneficiary });

        dispatch({
          type: "FETCH_SUCCESS",
          payload: newTransactions || [],
          beneficiary
        });
        return newTransactions;
      } catch (error) {
        dispatch({
          type: "FETCH_ERROR",
          payload: (error as Error)?.message || JSON.stringify(error)
        });
        throw error;
      }
    },
    [dispatch]
  );

  const addTransaction = useCallback(
    async (values: Partial<ITransaction>) => {
      dispatch({ type: "SUBMIT_START" });

      try {
        const transaction = await postTransaction(values);
        if (transaction) {
          dispatch({ type: "ADD_TRANSACTION", payload: transaction });
        }
      } catch (error) {
        throw error;
      } finally {
        dispatch({ type: "SUBMIT_END" });
      }
    },
    [dispatch]
  );

  const removeTransaction = useCallback(
    async (transactionId: number) => {
      dispatch({ type: "REMOVE_START", payload: transactionId });

      try {
        await deleteTransaction(transactionId);
        dispatch({ type: "REMOVE_END", payload: transactionId });
      } catch (error) {
        handleError(error);
        dispatch({ type: "REMOVE_ERROR", payload: transactionId });
      }
    },
    [dispatch]
  );

  return {
    ...state,
    balance,
    fetchTransactions,
    addTransaction,
    removeTransaction
  };
};
