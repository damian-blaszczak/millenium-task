import { Balance, Input, Footer, Form, Header, Loader } from "./components";
import { useInfinityScroll } from "./hooks";
import {
  ChangeEvent,
  lazy,
  Suspense,
  useCallback,
  useMemo,
  useRef
} from "react";
import { useTransactions } from "./hooks/useTransactions";
import { formFields, initialData } from "./constants";
import { debounce } from "./utils/debounce";
import {
  Layout,
  Container,
  Grid,
  StyledSection,
  Center,
  StyledLoaderContainer
} from "./App.styled";

const Table = lazy(() => import("./components/Table/Table"));

const App = () => {
  const loaderRef = useRef<HTMLDivElement>(null);

  const {
    fetchTransactions,
    addTransaction,
    removeTransaction,
    loading,
    removing,
    submitting,
    searching,
    balance,
    transactions,
    filteredTransactions,
    error
  } = useTransactions(loaderRef);

  useInfinityScroll({
    loaderRef,
    loading,
    fetchTransactions,
    filteredTransactions
  });

  const debouncedFetchTransactions = useMemo(
    () =>
      debounce(({ target }: ChangeEvent<HTMLInputElement>) => {
        return fetchTransactions({
          beneficiary: target.value || undefined,
          page: 1
        });
      }, 300),
    [fetchTransactions]
  );

  const handleOnChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      debouncedFetchTransactions(event);
    },
    [debouncedFetchTransactions]
  );

  return (
    <Layout>
      <Header />
      <Container>
        <Grid>
          <StyledSection>
            <Balance balance={balance} />
            <Input
              onChange={handleOnChange}
              label="Search for Beneficiary"
              placeholder="e.g. John Doe"
              loader={searching && <Loader $size={16} />}
              aria-label="Search for Beneficiary"
              id="search-beneficiary"
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
        {error && (
          <Center role="alert" aria-live="assertive">
            Error occurred: {JSON.stringify(error)}
          </Center>
        )}
        <Suspense fallback={<Loader />}>
          <Table
            data={filteredTransactions || transactions || []}
            title="Transactions"
            deleteItem={removeTransaction}
            deleting={removing}
          />
        </Suspense>
        <StyledLoaderContainer>
          <Center ref={loaderRef} aria-live="polite">
            {loading && <Loader role="status" aria-label="Loading content" />}
          </Center>
        </StyledLoaderContainer>
      </Container>
      <Footer />
    </Layout>
  );
};

export default App;
