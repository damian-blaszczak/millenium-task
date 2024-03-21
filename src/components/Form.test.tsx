import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Form } from "./Form";
import { ThemeProvider } from "styled-components";
import { theme } from "../theme";

const props = {
  onSubmit: jest.fn(),
  submitting: false,
  initialData: {},
  fields: [
    {
      name: "field1",
      label: "Field 1",
      type: "text",
      placeholder: "placeholder",
      required: true
    }
  ]
};

const renderAndSubmitForm = (value: string | number | null) => {
  // Arrange
  const view = render(
    <ThemeProvider theme={theme}>
      <Form {...props} />
    </ThemeProvider>
  );
  const field1Input = screen.getByPlaceholderText("placeholder");

  // Act
  fireEvent.change(field1Input, { target: { value: value } });

  fireEvent.click(screen.getByRole("button"));

  return view;
};

it("should send form and show success message", async () => {
  // Arrange & Act
  props.onSubmit.mockResolvedValue("test");
  renderAndSubmitForm("test");

  // Assert
  await waitFor(() => {
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    expect(screen.getByText("Submitted successfully")).toBeInTheDocument();
  });
});

it("should send form and show error message", async () => {
  // Arrange & Act
  props.onSubmit.mockRejectedValue({ message: "Failed" });
  console.error = jest.fn();
  renderAndSubmitForm("test");

  // Assert
  await waitFor(() => {
    expect(props.onSubmit).toHaveBeenCalledTimes(1);
    // eslint-disable-next-line testing-library/no-wait-for-multiple-assertions
    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });
});
