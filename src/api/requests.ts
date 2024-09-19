import { IGetTransactionsParams, ITransaction } from "../types";
import { buildUrlWithParams, normalizeData } from "../utils";
import { urls } from "./urls";

export const getTransactions = async ({
  page = 1,
  limit = 20,
  beneficiary
}: IGetTransactionsParams): Promise<ITransaction[] | undefined> => {
  try {
    const response = await fetch(
      buildUrlWithParams(urls.TRANSACTIONS, { page, limit, beneficiary })
    );
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const postTransaction = async (
  body: Partial<ITransaction>
): Promise<ITransaction | undefined> => {
  try {
    const response = await fetch(urls.TRANSACTIONS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      // JSON server needs to receive an object with ordered fields
      body: JSON.stringify(normalizeData(body))
    });
    return response.json();
  } catch (error) {
    throw error;
  }
};

export const deleteTransaction = async (transactionId: number) => {
  try {
    await fetch(`${urls.TRANSACTIONS}/${transactionId}`, {
      method: "DELETE"
    });
  } catch (error) {
    throw error;
  }
};
