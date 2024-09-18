import { normalizeData } from "./normalizeData";

it("should return normalized data", () => {
  const expectedData = {
    id: 1,
    amount: 123,
    beneficiary: "John Doe",
    account: "123456789",
    address: "New York",
    date: new Date().toUTCString(),
    description: "Sample description"
  };
  const data = normalizeData({
    ...expectedData,
    amount: 123,
    id: 1
  });

  expect(data).toEqual(expectedData);
});
