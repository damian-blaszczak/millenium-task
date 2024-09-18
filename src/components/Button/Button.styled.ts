import styled from "styled-components";

export const StyledButton = styled.button`
  padding: ${({ theme }) => theme.space.xs}px ${({ theme }) => theme.space.sm}px;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.gray};
  color: ${({ theme }) => theme.colors.black};
  transition-duration: 150ms;
  border: 0;
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.button};
    transform: scale(1.1);
  }
`;
