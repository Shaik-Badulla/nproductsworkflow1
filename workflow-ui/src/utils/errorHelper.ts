export const extractErrorMessage = (error: any) =>
  (error.response && error.response.data && error.response.data.data.message) ||
  (error.response.data.data.errors && JSON.stringify(error.response.data.data)) ||
  error.message ||
  error.toString();
