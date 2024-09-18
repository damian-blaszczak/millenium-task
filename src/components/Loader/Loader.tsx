import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  100% { transform: rotate(360deg) }
`;

const prixClipFix = keyframes`
  0% {clip-path:polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)}
  25% {clip-path:polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)}
  50% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,100% 100%,100% 100%)}
  75% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 100%)}
  100% {clip-path:polygon(50% 50%,0 0,100% 0,100% 100%,0 100%,0 0)}
`;

export const Loader = styled.div<{ $size?: number }>`
  width: ${({ $size }) => $size || 32}px;
  height: ${({ $size }) => $size || 32}px;
  border-radius: 50%;
  position: relative;
  animation: ${rotate} 1s linear infinite;
  margin: auto;
  &:before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    inset: 0px;
    border-radius: 50%;
    border: 5px solid ${({ theme }) => theme.colors.salmon};
    animation: ${prixClipFix} 2s linear infinite;
  }
`;
