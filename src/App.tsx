import styled from "styled-components";
import {
  Balance,
  Input,
  Footer,
  Form,
  Header,
  Loader,
  Table
} from "./components";
import { IFormField, ITransaction } from "./types";
import { urls } from "./api";
import { useDebounce, useFetch, useInfinityScroll } from "./hooks";
import { useCallback, useRef, useState } from "react";
import { handleError, normalizeData } from "./utils";

const Layout = styled.div`
  min-height: 100vh;
`;

const Container = styled.div`
  height: 100%;
  max-width: ${({ theme }) => theme.breakpoint.xl}px;
  padding: ${({ theme }) => theme.space.md}px;
  margin: auto;
`;

const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.space.md}px;
`;

const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.space.sm}px 0;
`;

const Grid = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: ${({ theme }) => theme.space.lg}px;
  margin-bottom: ${({ theme }) => theme.space.lg}px;
  @media (min-width: ${({ theme }) => theme.breakpoint.md}px) {
    display: grid;
    grid-template-columns: auto auto;
    gap: ${({ theme }) => theme.space.md}px;
  }
`;

const initialData: Partial<ITransaction> = {
  amount: 1,
  account: "",
  // there was no requirement for that field in form so I hardcoded its value it here to keep the data complete
  // In real life, I would go and ask the product owner about it.
  beneficiary: "John Doe",
  address: "",
  date: "",
  description: ""
};

const formFields: IFormField[] = [
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
    required: true
  },
  {
    label: "Description",
    type: "string",
    name: "description",
    placeholder: "Description",
    required: true
  }
];

const App = () => {
  const [filter, setFilter] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const [removing, setRemoving] = useState<number | undefined>(undefined);
  const debouncedFilterValue = useDebounce(filter, 300);
  const { data, loading, error, fetchNextPage, setData } = useFetch<
    ITransaction[]
  >(urls.TRANSACTIONS, { beneficiary: debouncedFilterValue });
  const loaderRef = useRef<HTMLDivElement>(null);
  const balance = data?.reduce((accumulator, current) => {
    return accumulator + current.amount;
  }, 0);

  const addTransaction = useCallback(
    async (values: Partial<ITransaction>) => {
      try {
        setSubmitting(true);
        const response = await fetch(urls.TRANSACTIONS, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(normalizeData(values))
        });
        const jsonData: ITransaction = await response.json();
        if (jsonData)
          setData((prev) => (prev ? [...prev, jsonData] : [jsonData]));
      } catch (error: any) {
        handleError(error);
      } finally {
        setSubmitting(false);
      }
    },
    [setData]
  );

  const removeTransaction = useCallback(
    async (transactionId: number) => {
      try {
        setRemoving(transactionId);
        await fetch(`${urls.TRANSACTIONS}/${transactionId}`, {
          method: "DELETE"
        });
        setData(data?.filter(({ id }) => id !== transactionId));
      } catch (error: any) {
        handleError(error);
      } finally {
        setRemoving(undefined);
      }
    },
    [data, setData]
  );

  useInfinityScroll(loaderRef, loading, fetchNextPage);

  return (
    <Layout>
      <Header />
      <Container>
        <Grid>
          <StyledSection>
            <Balance balance={balance} />
            <Input
              value={filter}
              onChange={(event) => setFilter(event.target.value)}
              label="Search for Beneficiary"
              placeholder="e.g. John Doe"
              loader={loading && filter.length > 0 && <Loader $size={16} />}
            />
          </StyledSection>
          <StyledSection>
            <Form
              onSubmit={addTransaction}
              submitting={submitting}
              initialData={initialData}
              fields={formFields}
            />
          </StyledSection>
        </Grid>
        {error && <Center>Error occurred: {JSON.stringify(error)}</Center>}
        {data && (
          <Table
            data={data}
            title="Transactions"
            deleteItem={removeTransaction}
            deleting={removing}
          />
        )}
        <Center ref={loaderRef}>{loading && <Loader />}</Center>
      </Container>
      <Footer />
    </Layout>
  );
};

export default App;
