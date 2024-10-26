import { useEffect, useRef } from "react";

//  Im aware that we could add more typescript to this hook to make it more robust, but I think this is a simple enough hook to not need the extra complexity. Probably would be overkill.
export function useOnUnmount(callback: () => void) {
  // Use a ref to store the latest callback, we are using so we have access to the latest version of the callback instance. Its like two cups both with the same liquid, they empty and fill at the same time. a referencing is like a copy of the cup and its contents. If we don't use a ref we would be using a copy of the callback and not the latest version, i.e. it can become stale and misrepresent the current state of the callback.
  const callbackRef = useRef(callback);

  // Update the ref whenever the callback changes, this is so that we can use the latest version of the callback in the unmount effect, the dependency means it will only fire this effect when the callback changes.
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Set up the unmount effect
  useEffect(() => {
    console.log("Component mounted");
    // verbose return with console log to identify the lifecycle, being that a return inside a useEffect is called when the component unmounts.
    return () => {
      console.log("Component unmounted");
      // Call the latest version of the callback
      // We return the current callback value of the ref, this is so that we can use the callback in an effect on unmount
      callbackRef.current();
      // Empty dependency array ensures this effect runs only on mount/unmount
    };
  }, []);
}
