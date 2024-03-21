import { useIsMobile } from "../hooks";
import { TableProps } from "../types";
import { TableDesktop } from "./TableDesktop";
import { TableMobile } from "./TableMobile";

export const Table = <T extends { id: number }>(props: TableProps<T>) => {
  const isMobile = useIsMobile(930);
  return isMobile ? <TableMobile {...props} /> : <TableDesktop {...props} />;
};
