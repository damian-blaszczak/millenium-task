import { render, screen } from "@testing-library/react";
import App from "./App";
import { ThemeProvider } from "styled-components";
import { theme } from "./theme";

beforeEach(() => {
  // IntersectionObserver isn't available in test environment
  const mockIntersectionObserver = jest.fn();
  mockIntersectionObserver.mockReturnValue({
    observe: () => null,
    unobserve: () => null,
    disconnect: () => null
  });
  window.IntersectionObserver = mockIntersectionObserver;
});

test("renders header with title", () => {
  render(
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  );
  const linkElement = screen.getByText(/Millenium task app/i);
  expect(linkElement).toBeInTheDocument();
});
