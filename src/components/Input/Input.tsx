import { InputHTMLAttributes, memo, ReactNode } from "react";
import { Container, StyledInput, LoaderWrapper } from "./Input.styled";

export const Input = memo(
  ({
    label,
    loader,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    loader?: ReactNode;
  }) => (
    <Container $isHidden={props.hidden}>
      <label htmlFor={props.id} style={{ textAlign: "right" }}>
        {label}
      </label>
      <StyledInput type="text" {...props} />
      {loader && <LoaderWrapper>{loader}</LoaderWrapper>}
    </Container>
  )
);
