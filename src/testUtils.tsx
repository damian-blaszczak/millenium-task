import { ThemeProvider } from "styled-components";
import { theme } from "./theme";
import { render } from "@testing-library/react";

export const renderWithTheme = (ui: React.ReactElement) => {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
};
