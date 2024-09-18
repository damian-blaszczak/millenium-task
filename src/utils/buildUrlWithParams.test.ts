import { QueryParams } from "../types";
import { buildUrlWithParams } from "./buildUrlWithParams";

it.each([
  {
    url: "test.com",
    params: {
      page: 1,
      limit: 10,
      name: "test"
    },
    expectedResult: "test.com?_page=1&_limit=10&name_like=test"
  },
  {
    url: "test.com",
    params: {
      name: "test"
    },
    expectedResult: "test.com?name_like=test"
  },
  {
    url: "test.com",
    params: {
      page: 1
    },
    expectedResult: "test.com?_page=1"
  },
  {
    url: "test.com",
    params: {},
    expectedResult: "test.com"
  }
] as { url: string; params: QueryParams; expectedResult: string }[])(
  "should return correct url",
  ({ url, params, expectedResult }) => {
    const buildedUrl = buildUrlWithParams(url, params);

    expect(buildedUrl).toEqual(expectedResult);
  }
);
