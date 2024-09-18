import { ITransaction } from "../types";

export const normalizeData = (data: Partial<ITransaction>) => {
  return {
    id: data.id,
    amount: data.amount,
    beneficiary: data.beneficiary,
    account: data.account,
    address: data.address,
    date: data.date,
    description: data.description
  };
};
