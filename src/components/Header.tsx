import styled from "styled-components";

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  padding: ${({ theme }) => theme.space.md}px ${({ theme }) => theme.space.lg}px;
  box-shadow: ${({ theme }) => theme.boxShadow.default};
  background-color: #fff;
  z-index: 10;
  display: flex;
  justify-content: center;
`;

export const Header = () => <StyledHeader>Millenium task app</StyledHeader>;
