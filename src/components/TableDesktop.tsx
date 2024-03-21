import { useMemo } from "react";
import styled from "styled-components";
import { Button } from "./Button";
import { Loader } from "./Loader";
import { TableProps } from "../types";
import { theme } from "../theme";

const StyledTable = styled.table`
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  padding: ${({ theme }) => theme.space.md}px ${({ theme }) => theme.space.sm}px;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.lightGray};
  text-transform: capitalize;
`;
const StyledTd = styled.td<{ $actionColumn?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  padding: ${({ theme }) => theme.space.sm}px;
  text-align: ${({ $actionColumn }) => ($actionColumn ? "center" : "left")};
`;

const StyledTr = styled.tr`
  transition: background-color 150ms;
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
  }
`;

export const TableDesktop = <T extends { id: number }>({
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
      {title && <h2>{title}</h2>}
      {data.length === 0 && <h3>No data</h3>}
      <StyledTable>
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
                {Object.entries(updatedItem).map(([key, value], cellIndex) => (
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
                ))}
              </StyledTr>
            );
          })}
        </tbody>
      </StyledTable>
    </div>
  );
};
