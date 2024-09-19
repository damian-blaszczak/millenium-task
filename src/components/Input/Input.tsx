import { InputHTMLAttributes, memo, ReactNode } from "react";
import {
  Container,
  StyledInput,
  LoaderWrapper,
  StyledLabel
} from "./Input.styled";

export const Input = memo(
  ({
    label,
    loader,
    hideArrows,
    ...props
  }: InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    loader?: ReactNode;
    hideArrows?: boolean;
  }) => (
    <Container $isHidden={props.hidden}>
      <StyledLabel htmlFor={props.id}>{label}</StyledLabel>
      <StyledInput type="text" $hideArrows={hideArrows} {...props} />
      {loader && <LoaderWrapper>{loader}</LoaderWrapper>}
    </Container>
  )
);
