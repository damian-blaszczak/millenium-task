import { QueryParams } from "../types";

export const buildUrlWithParams = (url: string, params: QueryParams) => {
  const queryString = Object.entries(params)
    .filter(([, value]) => value)
    .map(([key, value]) =>
      ["page", "limit"].includes(key)
        ? `_${encodeURIComponent(key)}=${encodeURIComponent(value!)}`
        : `${encodeURIComponent(key)}_like=${encodeURIComponent(value!)}`
    )
    .join("&");
  return queryString ? `${url}?${queryString}` : url;
};
