import { memo } from "react";
import { StyledFooter } from "./Footer.styled";

export const Footer = memo(() => (
  <StyledFooter role="contentinfo" aria-label="Site Footer">
    Created by Damian Błaszczak
  </StyledFooter>
));
