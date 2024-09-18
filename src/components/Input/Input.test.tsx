import { screen } from "@testing-library/react";
import { Input } from "./Input";
import { renderWithTheme } from "../../testUtils";

describe("Input", () => {
  it("should render the label correctly", () => {
    renderWithTheme(<Input label="Username" name="username" id="username" />);

    const label = screen.getByText("Username");
    expect(label).toBeInTheDocument();

    const input = screen.getByLabelText("Username");
    expect(input).toBeInTheDocument();
  });

  it("should pass props to the input element", () => {
    renderWithTheme(<Input label="Email" name="email" id="email" hidden />);

    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("hidden");
  });

  it("should render the loader when provided", () => {
    const loaderElement = <div>Loading...</div>;

    renderWithTheme(
      <Input label="Search" name="search" loader={loaderElement} />
    );

    const loader = screen.getByText("Loading...");
    expect(loader).toBeInTheDocument();
  });

  it("should not render the loader if not provided", () => {
    renderWithTheme(<Input label="Password" name="password" />);

    const loader = screen.queryByText("Loading");
    expect(loader).not.toBeInTheDocument();
  });
});
