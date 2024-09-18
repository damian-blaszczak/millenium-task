import { screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import { renderWithTheme } from "../../testUtils";
import { theme } from "../../theme";

describe("Button component", () => {
  it("renders with the correct text", () => {
    renderWithTheme(<Button text="Click Me" />);

    expect(screen.getByText("Click Me")).toBeInTheDocument();
  });

  it("applies hover styles correctly", () => {
    renderWithTheme(<Button text="Hover Button" />);
    const button = screen.getByRole("button");

    // Simulate hover state
    button?.dispatchEvent(new MouseEvent("mouseover", { bubbles: true }));

    fireEvent.mouseOver(button);

    // Check if hover styles are applied
    expect(button).toHaveStyle(`
      box-shadow: ${theme.boxShadow.button};
      transform: scale(1.1);
    `);
  });
});
