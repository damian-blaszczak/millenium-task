import { handleError } from "./errorHandler";

describe("handleError", () => {
  const alertMock = jest.spyOn(window, "alert").mockImplementation(() => {});

  afterAll(() => {
    alertMock.mockRestore();
  });

  it.each([
    new Error("error"),
    { message: "Unknown error", code: 404 },
    "Error: Something went wrong!",
    undefined
  ])("should log correct error message", (error) => {
    handleError(error);

    expect(alertMock).toHaveBeenCalledWith(`An error occurred: ${error}`);
  });
});
