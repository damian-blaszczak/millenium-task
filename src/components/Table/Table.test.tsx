import { screen } from "@testing-library/react";
import Table from "./Table";
import { useIsMobile } from "../../hooks/useIsMobile";
import { renderWithTheme } from "../../testUtils";

jest.mock("../../hooks/useIsMobile", () => ({
  useIsMobile: jest.fn()
}));

describe("Table component", () => {
  const mockProps = {
    data: [
      {
        id: 1,
        amount: 100,
        beneficiary: "John Doe"
      }
    ],
    title: "Table title"
  };

  it.each`
    isMobile | displayedTable     | hiddenTable
    ${true}  | ${"table-mobile"}  | ${"table-desktop"}
    ${false} | ${"table-desktop"} | ${"table-mobile"}
  `(
    "should render $displayedTable",
    ({ isMobile, displayedTable, hiddenTable }) => {
      (useIsMobile as jest.Mock).mockReturnValue(isMobile);

      renderWithTheme(<Table {...mockProps} />);

      const mobileTable = screen.getByTestId(displayedTable);
      expect(mobileTable).toBeInTheDocument();

      const desktopTable = screen.queryByTestId(hiddenTable);
      expect(desktopTable).not.toBeInTheDocument();
    }
  );
});
