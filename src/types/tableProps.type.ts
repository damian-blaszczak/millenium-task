export type TableProps<T> = {
  data: T[];
  title?: string;
  deleteItem?: (itemId: number) => Promise<void>;
  deleting?: number;
};
