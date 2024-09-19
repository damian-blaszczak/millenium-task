import styled from "styled-components";

export const Layout = styled.div`
  min-height: 100vh;
`;

export const Container = styled.div`
  height: 100%;
  max-width: ${({ theme }) => theme.breakpoint.xl}px;
  padding: ${({ theme }) => theme.space.md}px;
  margin: auto;
`;

export const StyledSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: ${({ theme }) => theme.space.md}px;
`;

export const Center = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding: ${({ theme }) => theme.space.sm}px 0;
`;

export const Grid = styled.div`
  display: flex;
  flex-direction: column-reverse;
  gap: ${({ theme }) => theme.space.lg}px;
  margin-bottom: ${({ theme }) => theme.space.lg}px;
  @media (min-width: ${({ theme }) => theme.breakpoint.md}px) {
    display: grid;
    grid-template-columns: auto auto;
    gap: ${({ theme }) => theme.space.md}px;
  }
`;

export const StyledLoaderContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ theme }) => theme.space.xl}px;
  margin-top: ${({ theme }) => theme.space.md}px;
`;
