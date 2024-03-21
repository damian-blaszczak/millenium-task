import { InputHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  padding: ${({ theme }) => theme.space.sm + 2}px
    ${({ theme }) => theme.space.sm}px ${({ theme }) => theme.space.sm}px
    ${({ theme }) => theme.space.sm}px;
  border-radius: 4px;
  width: 55%;
  @media (min-width: ${({ theme }) => theme.breakpoint.md}px) {
    margin-left: ${({ theme }) => theme.space.sm}px;
  }
`;

const Container = styled.div<{ $isHidden?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
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

const LoaderWrapper = styled.div`
  display: none;
  position: absolute;
  @media (min-width: ${({ theme }) => theme.breakpoint.md}px) {
    display: block;
    right: 8px;
  }
`;

export const Input = ({
  label,
  loader,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  loader?: ReactNode;
}) => {
  return (
    <Container $isHidden={props.hidden}>
      <label style={{ textAlign: "right" }}>{label}</label>
      <StyledInput type="text" {...props} />
      {loader && <LoaderWrapper>{loader}</LoaderWrapper>}
    </Container>
  );
};
