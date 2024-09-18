export const removeDuplicates = <T extends { id: number }>(
  arr: T[],
  key: keyof T = "id"
): T[] => {
  const seen = new Set();
  return arr.filter((item) => {
    const duplicate = seen.has(item[key]);
    seen.add(item[key]);
    return !duplicate;
  });
};
