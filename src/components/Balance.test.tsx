import { ThemeProvider } from "styled-components";
import { theme } from "../theme";
import { Balance } from "./Balance";
import { render } from "@testing-library/react";

it("renders header with title", () => {
  const { container } = render(
    <ThemeProvider theme={theme}>
      <Balance balance={123} />
    </ThemeProvider>
  );
  expect(container).toMatchInlineSnapshot(`
<div>
  <div>
    <p
      class="sc-beySPh jVyZMP"
    >
      Balance:
    </p>
    <strong>
      123.00
    </strong>
  </div>
</div>
`);
});
