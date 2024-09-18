import { memo } from "react";
import { StyledHeader } from "./Header.styled";

export const Header = memo(() => (
  <StyledHeader role="banner" aria-label="Site Header">
    Millenium task app
  </StyledHeader>
));
