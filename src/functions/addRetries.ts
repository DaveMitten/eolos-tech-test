import { sleep } from "./sleep";

export function addRetries(callbackToRetry: (...args: any) => Promise<any>) {
  return async (...args: any) => {
    let retryCount = 0;
    let newError: any;
    while (retryCount < 3) {
      try {
        const result = await callbackToRetry(...args);
        return result;
      } catch (error) {
        retryCount++;
        newError = error;
        if (retryCount < 3) {
          await sleep(200 * retryCount);
        }
      }
    }
    throw newError;
  };
}
