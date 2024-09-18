import { RefObject, useCallback, useEffect, useRef, useState } from "react";
import { ITransaction } from "../types";
import { handleError } from "../utils";

interface IUseInfinityScroll {
  loaderRef: RefObject<HTMLDivElement>;
  loading: boolean;
  fetchTransactions: (params: {
    page?: number;
    beneficiary?: string;
  }) => Promise<ITransaction[] | undefined>;
  filteredTransactions: ITransaction[] | undefined;
}

export const useInfinityScroll = ({
  loaderRef,
  loading,
  fetchTransactions,
  filteredTransactions
}: IUseInfinityScroll) => {
  const [hasMore, setHasMore] = useState(true);
  const currentPageRef = useRef(1);

  const fetchNextPage = useCallback(async () => {
    try {
      const transactions = await fetchTransactions({
        page: currentPageRef.current
      });
      const anyTransaction = Boolean(transactions?.length);

      setHasMore(anyTransaction);
      if (anyTransaction) currentPageRef.current = currentPageRef.current + 1;
    } catch (error) {
      handleError(error);
    }
  }, [fetchTransactions]);

  useEffect(() => {
    let debounceTimeout: NodeJS.Timeout | null = null;

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        !loading &&
        hasMore &&
        !filteredTransactions
      ) {
        debounceTimeout = setTimeout(() => {
          fetchNextPage();
        }, 500);
      }
    });

    const loader = loaderRef?.current;

    if (loader) {
      observer.observe(loader);
    }

    return () => {
      if (loader) {
        observer.unobserve(loader);
      }
      if (debounceTimeout) {
        clearTimeout(debounceTimeout);
      }
    };
  }, [fetchNextPage, filteredTransactions, hasMore, loaderRef, loading]);
};
