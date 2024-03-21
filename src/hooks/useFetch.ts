import { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { IFetchResult, QueryParams } from "../types";
import { buildUrlWithParams } from "../utils";

export const useFetch = <T>(
  url: string,
  filter?: { [key: string]: string }
): IFetchResult<T> => {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | undefined>(undefined);
  const [params, setParams] = useState<QueryParams>({
    page: 1,
    limit: 20,
    ...filter
  });
  const dataRef = useRef(data);
  const isFilter = useMemo(
    () =>
      filter && Object.values(filter).some((value) => value || value === ""),
    [filter]
  );

  const fetchData = useCallback(() => {
    if (
      (Array.isArray(dataRef.current) &&
        dataRef.current.length === 0 &&
        Number(params.page) > 1) ||
      error
    )
      return;
    const fetchUrl = params ? buildUrlWithParams(url, params) : url;
    setLoading(true);

    return fetch(fetchUrl)
      .then((res) => res.json())
      .then((data) => {
        setData((prev) => {
          if (prev && Array.isArray(prev) && params && Number(params.page) > 1)
            return [...prev, ...data];
          return data;
        });
        dataRef.current = data;
        setError(undefined);
      })
      .catch((error) => setError(error.message))
      .finally(() => setLoading(false));
  }, [error, params, url]);

  useEffect(() => {
    if (isFilter && data) {
      setParams((prev) => ({ ...prev, page: 1, ...filter }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(filter), isFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    data,
    loading,
    error,
    setData,
    fetchNextPage: () =>
      setParams((prev) => ({ ...prev, page: Number(prev.page || 0) + 1 }))
  };
};
