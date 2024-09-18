import { IFormField, ITransaction } from "./types";

export const initialData: Partial<ITransaction> = {
  amount: 1,
  account: "",
  // Hardcoded value because we are not authenticated
  beneficiary: "John Doe",
  address: "",
  date: "",
  description: ""
};

export const formFields: IFormField[] = [
  {
    label: "Amount",
    type: "number",
    name: "amount",
    placeholder: "Amount in PLN",
    min: 1,
    required: true
  },
  {
    label: "Beneficiary",
    type: "text",
    name: "beneficiary",
    hidden: true
  },
  {
    label: "Account number",
    type: "number",
    name: "account",
    placeholder: "Beneficiary account number",
    required: true
  },
  {
    label: "Address",
    type: "string",
    name: "address",
    placeholder: "Beneficiary address",
    required: true,
    autoComplete: "billing address-line1"
  },
  {
    label: "Description",
    type: "string",
    name: "description",
    placeholder: "Description",
    required: true
  }
];
