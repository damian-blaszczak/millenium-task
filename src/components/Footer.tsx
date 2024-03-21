import styled from "styled-components";

const StyledFooter = styled.footer`
  padding: ${({ theme }) => theme.space.lg}px ${({ theme }) => theme.space.md}px;
  background-color: #f2f2f2;
  margin-top: ${({ theme }) => theme.space.lg}px;
  display: flex;
  justify-content: center;
`;

export const Footer = () => <StyledFooter>Footer</StyledFooter>;
