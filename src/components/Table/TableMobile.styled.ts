import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.space.md}px;
`;

export const Tile = styled.div`
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
