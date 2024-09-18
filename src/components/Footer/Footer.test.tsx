import { screen } from "@testing-library/react";
import { Footer } from "./Footer";
import { renderWithTheme } from "../../testUtils";

describe("Footer", () => {
  it("should render the footer", () => {
    renderWithTheme(<Footer />);

    const footer = screen.getByRole("contentinfo", { name: "Site Footer" });
    expect(footer).toBeInTheDocument();
  });

  it("should display the creator name", () => {
    renderWithTheme(<Footer />);

    const footerText = screen.getByText("Created by Damian Błaszczak");
    expect(footerText).toBeInTheDocument();
  });
});
