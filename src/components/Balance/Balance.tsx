import { memo } from "react";
import { StyledParagraph } from "./Balance.styled";

export const Balance = memo(({ balance }: { balance: number | undefined }) => (
  <div aria-live="polite">
    <StyledParagraph>Balance:</StyledParagraph>
    <strong>{balance?.toFixed(2) || "-"}</strong>
  </div>
));
