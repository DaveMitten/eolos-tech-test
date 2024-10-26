import { sleep } from "./sleep";

export const dangerousFunction = async () => {
  await sleep(100 + Math.random() * 50);
  const hasErrored = Math.random() > 0.5;
  if (hasErrored) {
    throw new Error(`Unknown error at ${new Date().toISOString()}`);
  }
  return { message: `Success at ${new Date().toISOString()}` };
};

// let currentPromise: Promise<unknown> | null = null;
// let isRunning = false;

// //The typescript i have used here I feel is necessary because it is having unknown functions being passed in and we want to return the correct types.
// export const noParallelCalls = async <T extends () => Promise<unknown>>(
//   dangerousCallBack: T
// ): Promise<Awaited<ReturnType<T>>> => {

//   // If there's already a promise running, return it
//   if (currentPromise) {
//     return currentPromise as Promise<Awaited<ReturnType<T>>>;
//   }

//   // If the function is running return an error. We could simply return a resolved promise, but then the user will not know that their function was not executed. With an error we are informing the user a function is already running.
//   // if (isRunning) {
//     // throw new Error("Function is already running");
//   // }
//   // I wanted to show my first iteration above, i realised on review that i was not returning the same result, meaning we would need to add error handling.

//   //if the function is not running and is about to be called, set the flag to true
//   isRunning = true;

//   try {
//     // Store the promise before awaiting it
//     currentPromise = dangerousCallBack();
//     const result = await currentPromise;
//     return result as Awaited<ReturnType<T>>;
//   } finally {
//     // Clear the stored promise and reset running state
//     currentPromise = null;
//     isRunning = false;
//   }
// };

// I have refactored the code as my initial solution was not returning the same result. It was returning an error, this would then require error handling and would not satisfy the requirement of returning the same result.
let isRunning = false;
let executingPromise: Promise<unknown> | null = null;

export const noParallelCalls = async <T extends () => Promise<unknown>>(
  dangerousCallBack: T
): Promise<Awaited<ReturnType<T>>> => {
  // if promise is running return the executing promise
  if (isRunning) {
    // If a call is already in progress, return the last promise
    return executingPromise as Promise<Awaited<ReturnType<T>>>;
  }
  // set the flag to true for the executing promise
  isRunning = true;
  try {
    // Create a initial executing promise and store it in a variable outside of the noParallelCalls function
    executingPromise = dangerousCallBack();
    //await delivery of the promise
    const result = await executingPromise;
    // return the result of the promise
    return result as Awaited<ReturnType<T>>;
  } finally {
    // reset the flag to false freeing up the function to be called again
    isRunning = false;
  }
};
