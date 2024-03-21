export const handleError = (error: Error) => {
  console.error("An error occurred:", error?.message || error);
};
