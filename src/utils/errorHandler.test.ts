import { handleError } from "./errorHandler";

describe("handleError", () => {
  let consoleErrorSpy: jest.SpyInstance;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
  });

  it.each([
    new Error("error"),
    { message: "Unknown error", code: 404 },
    "Error: Something went wrong!",
    undefined
  ])("should log correct error message", (error) => {
    handleError(error);

    expect(consoleErrorSpy).toHaveBeenCalledWith("An error occurred:", error);
  });
});
