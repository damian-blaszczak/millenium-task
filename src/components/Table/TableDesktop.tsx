import { memo, useMemo } from "react";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";
import { TableProps } from "../../types";
import { theme } from "../../theme";
import {
  StyledTable,
  StyledTd,
  StyledTh,
  StyledTr
} from "./TableDesktop.styled";

export const TableDesktop = memo(
  <T extends { id: number }>({
    data,
    title,
    deleteItem,
    deleting
  }: TableProps<T>) => {
    const headers = useMemo(
      () => (data.length > 0 ? Object.keys(data[0]) : []),
      [data]
    );
    if (!headers.includes("actions") && data.length && deleteItem)
      headers.push("actions");
    return (
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {title && <h2 id="desktop-table-title">{title}</h2>}
        {data.length === 0 && <h3>No data</h3>}
        <StyledTable
          aria-labelledby="desktop-table-title"
          data-testid="table-desktop"
        >
          <thead>
            <tr>
              {headers.map((header) => (
                <StyledTh key={header}>{header}</StyledTh>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item) => {
              const updatedItem = deleteItem ? { ...item, delete: "x" } : item;
              const isDeleting = deleting === item.id;
              return (
                <StyledTr key={item.id}>
                  {Object.entries(updatedItem).map(
                    ([key, value], cellIndex) => (
                      <StyledTd
                        key={`${key}-${cellIndex}`}
                        $actionColumn={key === "delete"}
                      >
                        {key === "date" ? (
                          new Date(String(value)).toUTCString()
                        ) : key === "delete" ? (
                          <Button
                            onClick={() => deleteItem?.(item.id)}
                            disabled={isDeleting}
                            color={theme.colors.red}
                            text={
                              isDeleting ? <Loader $size={16} /> : String(value)
                            }
                          />
                        ) : (
                          String(value)
                        )}
                      </StyledTd>
                    )
                  )}
                </StyledTr>
              );
            })}
          </tbody>
        </StyledTable>
      </div>
    );
  }
);
