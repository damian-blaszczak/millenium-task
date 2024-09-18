import { Dispatch, SetStateAction } from "react";

export interface IFetchResult<T> {
  data: T | undefined;
  loading: boolean;
  error: Error | undefined;
  setData: Dispatch<SetStateAction<T | undefined>>;
  fetchNextPage: () => void;
}
