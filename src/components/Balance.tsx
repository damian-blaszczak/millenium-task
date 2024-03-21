import styled from "styled-components";

const StyledParagraph = styled.p`
  display: inline-block;
  margin-right: ${({ theme }) => theme.space.xs}px;
`;

export const Balance = ({ balance }: { balance: number | undefined }) => (
  <div>
    <StyledParagraph>Balance:</StyledParagraph>
    <strong>{balance?.toFixed(2) || "-"}</strong>
  </div>
);
