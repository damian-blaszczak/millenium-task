import styled from "styled-components";
import { TableProps } from "../types";
import { Button } from "./Button";
import { Loader } from "./Loader";
import { theme } from "../theme";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.md}px;
`;

const Tile = styled.div`
  padding: ${({ theme }) => theme.space.sm}px;
  border-radius: 8px;
  box-shadow: ${({ theme }) => theme.boxShadow.default};
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid ${({ theme }) => theme.colors.gray};
  width: 100%;
  max-width: 400px;
`;

export const TableMobile = <T extends { id: number }>({
  data,
  title,
  deleteItem,
  deleting
}: TableProps<T>) => {
  return (
    <Container>
      <h2>{title}</h2>
      {data.length === 0 && <h3>No data</h3>}
      {data.map((item) => {
        const isDeleting = deleting === item.id;
        return (
          <Tile key={item.id}>
            {Object.entries(item).map(([key, value], cellIndex) => (
              <div key={`${key}-${cellIndex}`}>
                <div>
                  <strong style={{ textTransform: "capitalize" }}>{key}</strong>
                  : {value}
                </div>
              </div>
            ))}
            <Button
              color={theme.colors.red}
              onClick={() => deleteItem?.(item.id)}
              disabled={isDeleting}
              text={isDeleting ? <Loader $size={16} $color="blue" /> : "x"}
            />
          </Tile>
        );
      })}
    </Container>
  );
};
