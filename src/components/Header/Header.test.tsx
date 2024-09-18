import { screen } from "@testing-library/react";
import { Header } from "./Header";
import { renderWithTheme } from "../../testUtils";

describe("Header", () => {
  it("should render the header", () => {
    renderWithTheme(<Header />);

    const header = screen.getByRole("banner", { name: "Site Header" });
    expect(header).toBeInTheDocument();
  });

  it("should display the app name", () => {
    renderWithTheme(<Header />);

    const headerText = screen.getByText("Millenium task app");
    expect(headerText).toBeInTheDocument();
  });
});
