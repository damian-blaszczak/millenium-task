import styled from "styled-components";

export const StyledInput = styled.input<{ $hideArrows?: boolean }>`
  padding: ${({ theme }) => theme.space.sm + 2}px
    ${({ theme }) => theme.space.sm}px ${({ theme }) => theme.space.sm}px
    ${({ theme }) => theme.space.sm}px;
  border-radius: 4px;
  width: 55%;

  ${({ $hideArrows }) => {
    if ($hideArrows) {
      return `
      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        appearance: none;
        margin: 0;
      }
      -moz-appearance: textfield;
      `;
    }
  }}
  @media (min-width: ${({ theme }) => theme.breakpoint.md}px) {
    margin-left: ${({ theme }) => theme.space.sm}px;
  }
`;

export const Container = styled.div<{ $isHidden?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs}px;
  width: 100%;
  position: relative;
  display: ${({ $isHidden }) => ($isHidden ? "none" : "flex")};
  align-items: center;
  @media (min-width: ${({ theme }) => theme.breakpoint.md}px) {
    flex-direction: row;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.space.md}px;
  }
`;

export const LoaderWrapper = styled.div`
  display: none;
  position: absolute;
  @media (min-width: ${({ theme }) => theme.breakpoint.md}px) {
    display: block;
    right: ${({ theme }) => theme.space.sm}px;
  }
`;

export const StyledLabel = styled.label`
  text-align: right;
`;
