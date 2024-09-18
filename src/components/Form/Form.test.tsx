import { fireEvent, screen, waitFor } from "@testing-library/react";
import { Form } from "./Form";
import { renderWithTheme } from "../../testUtils";

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
describe("Form", () => {
  const renderAndSubmitForm = (value: string | number | null) => {
    const view = renderWithTheme(<Form {...props} />);
    const fieldInput = screen.getByPlaceholderText("placeholder");

    fireEvent.change(fieldInput, { target: { value: value } });
    fireEvent.click(screen.getByRole("button"));

    return view;
  };

  it("should send form and show success message", async () => {
    props.onSubmit.mockResolvedValueOnce("test");
    renderAndSubmitForm("test");

    await waitFor(() => expect(props.onSubmit).toHaveBeenCalledTimes(1));

    const successMessage = await screen.findByText("Submitted successfully");
    expect(successMessage).toBeInTheDocument();
  });

  it("should send form and show error message", async () => {
    props.onSubmit.mockRejectedValueOnce({ message: "Failed" });
    console.error = jest.fn();
    renderAndSubmitForm("test");

    await waitFor(() => expect(props.onSubmit).toHaveBeenCalledTimes(1));

    const errorMessage = await screen.findByText("An error occurred");
    await expect(errorMessage).toBeInTheDocument();
  });
});
