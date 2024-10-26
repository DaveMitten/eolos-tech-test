import { addRetries } from "../addRetries";

// Failing function
const mockFailingFunction = jest.fn().mockImplementation(() => {
  throw new Error("Test error");
});

// Success function
const mockRetryableFunction = jest.fn().mockImplementation(() => {
  return "Success";
});

// Clear the mocks before each test
beforeEach(() => {
  mockFailingFunction.mockClear();
  mockRetryableFunction.mockClear();
});

describe("Add retries to function and return the correct result either an error or a successful invocation result", () => {
  test("When the callback function 3 fails times addRetries should throw an error", async () => {
    const retryFunction = addRetries(mockFailingFunction);

    await expect(retryFunction()).rejects.toThrow("Test error");
  });

  test("When the callback function succeeds, addRetries should return the result", async () => {
    const retryFunction = addRetries(mockRetryableFunction);

    const result = await retryFunction();

    expect(result).toBeDefined();
  });
});
