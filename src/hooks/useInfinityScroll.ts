import { RefObject, useEffect } from "react";

export const useInfinityScroll = (
  loaderRef: RefObject<HTMLDivElement>,
  loading: boolean,
  fetchNextPage: () => void
) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading) {
        fetchNextPage();
      }
    });

    if (loaderRef?.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef?.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(loaderRef?.current);
      }
    };
  }, [fetchNextPage, loaderRef, loading]);
};
