import { ButtonHTMLAttributes, ReactNode } from "react";
import styled from "styled-components";

const StyledButton = styled.button<{ $bg?: string }>`
  padding: ${({ theme }) => theme.space.xs}px ${({ theme }) => theme.space.sm}px;
  border-radius: 4px;
  cursor: pointer;
  background-color: ${({ $bg, theme }) => $bg || theme.colors.blue};
  color: ${({ theme }) => theme.colors.white};
  transition-duration: 150ms;
  &:hover {
    box-shadow: ${({ theme }) => theme.boxShadow.button};
    background-color: ${({ $bg, theme }) => ($bg || theme.colors.blue) + "99"};
  }
`;

export const Button = ({
  text,
  color,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  text: ReactNode;
  color?: string;
}) => (
  <StyledButton $bg={color} {...props}>
    {text}
  </StyledButton>
);
