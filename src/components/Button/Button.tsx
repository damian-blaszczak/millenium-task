import { ButtonHTMLAttributes, memo, ReactNode } from "react";
import { StyledButton } from "./Button.styled";

export const Button = memo(
  ({
    text,
    ...props
  }: ButtonHTMLAttributes<HTMLButtonElement> & {
    text: ReactNode;
    color?: string;
  }) => <StyledButton {...props}>{text}</StyledButton>
);
