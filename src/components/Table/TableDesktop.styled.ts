import styled from "styled-components";

export const StyledTable = styled.table`
  border-collapse: collapse;
`;

export const StyledTh = styled.th`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  padding: ${({ theme }) => theme.space.md}px ${({ theme }) => theme.space.sm}px;
  text-align: left;
  background-color: ${({ theme }) => theme.colors.lightGray};
  text-transform: capitalize;
`;
export const StyledTd = styled.td<{ $actionColumn?: boolean }>`
  border: 1px solid ${({ theme }) => theme.colors.gray};
  padding: ${({ theme }) => theme.space.sm}px;
  text-align: ${({ $actionColumn }) => ($actionColumn ? "center" : "left")};
`;

export const StyledTr = styled.tr`
  transition: background-color 150ms;
  &:nth-child(even) {
    background-color: ${({ theme }) => theme.colors.lightGray};
  }
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray};
  }
`;

export const StyledTableContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
