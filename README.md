# Test Instructions

## This is barebones Vite project with React and Typescript

### This project uses yarn as its package manager. When additional dependencies are required, the instructions will state this explicitly

1. Create a Products page to replace the current placeholder. It should retrieve Products data from https://dummyjson.com/

   a. Please create a searchProducts fetch function and the typescript Type according to the documentation. It should be able to return filtered results based on a search string. If the string is empty, all Products should be returned. Either use the fetch API or install axios, whichever you are more comfortable using.

   b. There is a function in **_src/functions/addRetries.ts_** which adds retries to async functions. The typing is currently suboptimal, resulting in the return type as `Promise<any>` and typescript issues when it is used. It should accept any callback, the only constraint is that the callback should be asynchronous.

   c. Create some tests for the addRetries function

   d. Use the searchProducts function and the addRetries function to build out a simple page, showing all products on mount as a scrollable list. Add in support for loading and error states. Please use TanStack Query when integrating. For the point of this exercise, you can disable TanStack Query's inbuilt retry functionality.

2. Using the [mobX](https://mobx.js.org/README.html) library, create the ability to type in a search query in order to return relevant products. The user should be able to type in their query and then see relevant results appear without having to click a "search" button. A small loading indicator should appear to the right of the input field. There should however be a button to clear the search query and default to returning all products. MobX should be used so that:

   a. The text input field is a "controlled component"

   b. Text input changes should not lead to immediate re-renders of the list. Instead, re-renders should be limited via debounce functionality to a maximum of once every 800 milliseconds, causing the products list to refetch.

   c. The mobx store should only contain logic for storing and updating local UI states. API data should live elsewhere.

3. Imagine that the project depends on an asynchronous function which could be fired from multiple contexts, but race conditions could happen if multiple instances are awaiting resolution at the same time. There is an unfinished function **_src/functions/noParallelCalls.ts_**. Finish this function so that the mock function it accepts cannot have multiple asynchronous operations running at once (calling it in quick succession should return the same result) and the jest tests pass.

4. There is an unfinished custom hook **_src/hooks/useRunOnUnmount.ts_**. Finish it so that the callback only executes on unmounting of the component (not at any other point of the lifecycle of the parent component), but that on execution the callback is not stale. Write some tests to confirm that it works as intended, installing and configuring React Testing Library.

### If you have faced particular challenges and have made a particular decision on how to proceed, please explain your reasoning below, in this README. This test is not intended to trick you. If you think there are any bugs with the test itself (ie it feels like you have been tricked) please let us know below as well
