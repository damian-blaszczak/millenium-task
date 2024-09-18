import { Balance } from "./Balance";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../testUtils";

describe("Balance", () => {
  it("should render balance with formatted value", () => {
    renderWithTheme(<Balance balance={123} />);
    expect(screen.getByText("123.00")).toBeInTheDocument();
  });

  it("should render '-' when balance is not provided", () => {
    renderWithTheme(<Balance balance={undefined} />);
    expect(screen.getByText("-")).toBeInTheDocument();
  });
});
