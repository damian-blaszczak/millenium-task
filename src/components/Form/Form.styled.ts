import styled from "styled-components";

export const StyledForm = styled.form`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-width: 400px;
  align-items: center;
`;

export const StyledText = styled.p<{ $submitted: boolean | undefined }>`
  color: ${({ $submitted }) => ($submitted ? "green" : "red")};
  position: absolute;
  bottom: -${({ theme }) => theme.space.xl + theme.space.md}px;
  opacity: ${({ $submitted }) => ($submitted === undefined ? "0" : "1")};
  transition: opacity 300ms ease;
`;
