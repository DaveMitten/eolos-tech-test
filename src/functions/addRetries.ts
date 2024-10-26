// Original only kept for reference and since this is a tech test. Normally I would remove this before pushing to repo. Same goes for overuse of comments.

// import { sleep } from "./sleep";

// export function addRetries(callbackToRetry: (...args: any) => Promise<any>) {
//   return async (...args: any) => {
//     let retryCount = 0;
//     let newError: any;
//     while (retryCount < 3) {
//       try {
//         const result = await callbackToRetry(...args);
//         return result;
//       } catch (error) {
//         retryCount++;
//         newError = error;
//         if (retryCount < 3) {
//           await sleep(200 * retryCount);
//         }
//       }
//     }
//     throw newError;
//   };
// }

import { sleep } from "./sleep";

// I wanted to state, i dont like the idea of a retry function. I am unsure as to why the function is needed. Normally if a call is to fail, i would want to understand why this has failed and remedy that. Whilst I understand bad internet connection amongst other reasons can cause this, I would normally write code to inform the user and ask if they want to retry, rather than retrying or something similar. I prefer to be explicit and handle errors as they occur, rather than continue retrying. If the return was an error but it still inacted functionality, we could be retrying a badly written call or feature thus resulting in further damage.

/**
 * @description
 *  1. I am using the type T to extend the function type It preserves the specific input and output types of the CB function
 * 2. Since we want to avoid using 'any' type if we can, I've used TArgs and TReturn to define the argument types and return value types of the callbackToRetry function.
 * 3. I've replaced any with unknown. This is the way TS suggests to handle any types. Its safer than any.
 * 4. It should be noted that unknown[] does not mean only an array can be used, This refers to a tuple type but it can be used for other types. Here it is used to accept any number of arguments that can be found in the spread operator.
 */

// TArgs = type arguments
// TReturn = type return
export function addRetries<TArgs extends unknown[], TReturn>(
  callbackToRetry: (...args: TArgs) => Promise<TReturn>
): (...args: TArgs) => Promise<TReturn> {
  return async (...args: TArgs): Promise<TReturn> => {
    let retryCount = 0;
    let newError: unknown;

    while (retryCount < 3) {
      try {
        return await callbackToRetry(...args);
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
