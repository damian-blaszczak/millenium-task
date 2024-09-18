import { removeDuplicates } from "./removeDuplicates";

describe("removeDuplicates", () => {
  it("should remove duplicate objects by id (default)", () => {
    const data = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 1, name: "Alice Duplicate" }, // Duplicate
      { id: 3, name: "Charlie" }
    ];

    const result = removeDuplicates(data);

    expect(result).toEqual([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" }
    ]);
  });

  it("should remove duplicate objects by a custom key", () => {
    const data = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Alice" }, // Duplicate by name
      { id: 4, name: "Charlie" }
    ];

    const result = removeDuplicates(data, "name");

    expect(result).toEqual([
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 4, name: "Charlie" }
    ]);
  });

  it("should return an empty array if the input array is empty", () => {
    const data: { id: number; name: string }[] = [];

    const result = removeDuplicates(data);

    expect(result).toEqual([]);
  });

  it("should not remove any objects if there are no duplicates", () => {
    const data = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
      { id: 3, name: "Charlie" }
    ];

    const result = removeDuplicates(data);

    expect(result).toEqual(data);
  });
});
