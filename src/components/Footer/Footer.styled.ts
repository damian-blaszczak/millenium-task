import styled from "styled-components";

export const StyledFooter = styled.footer`
  padding: ${({ theme }) => theme.space.lg}px ${({ theme }) => theme.space.md}px;
  background-color: ${({ theme }) => theme.colors.lightGray};
  margin-top: ${({ theme }) => theme.space.lg}px;
  display: flex;
  justify-content: center;
`;
