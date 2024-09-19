import { TableProps } from "../../types";
import { Button } from "../Button/Button";
import { Loader } from "../Loader/Loader";
import { theme } from "../../theme";
import { memo } from "react";
import { Container, StyledStrong, Tile } from "./TableMobile.styled";

export const TableMobile = memo(
  <T extends { id: number }>({
    data,
    title,
    deleteItem,
    deleting
  }: TableProps<T>) => {
    return (
      <Container aria-labelledby="mobile-table" data-testid="table-mobile">
        <h2 id="mobile-table">{title}</h2>
        {data.length === 0 && <h3>No data</h3>}
        {data.map((item) => {
          const isDeleting = deleting === item.id;
          return (
            <Tile key={item.id}>
              {Object.entries(item).map(([key, value], cellIndex) => (
                <div key={`${key}-${cellIndex}`}>
                  <div>
                    <StyledStrong>{key}</StyledStrong>: {value}
                  </div>
                </div>
              ))}
              <Button
                color={theme.colors.red}
                onClick={() => deleteItem?.(item.id)}
                disabled={isDeleting}
                text={isDeleting ? <Loader $size={16} /> : "x"}
              />
            </Tile>
          );
        })}
      </Container>
    );
  }
);
