import { render, cleanup } from "@testing-library/react";
import { useOnUnmount } from "../useOnUnmount";

describe("useOnUnmount", () => {
  // Cleanup after each test
  afterEach(() => {
    cleanup();
  });
  // I initially wrote this except i realise i could combine the two in a test. Whilst I know we should run simpler tests, the execution is simple enough to have this combined and DRY code is often better than WET

  // it("should not run the callback on mount", () => {
  //   const callback = jest.fn();
  //   const TestComponent = () => {
  //     useOnUnmount(callback);
  //     return null;
  //   };

  //   render(<TestComponent />);
  //   expect(callback).not.toHaveBeenCalled();
  // });

  it("should run the callback on unmount and not on mount", () => {
    const callback = jest.fn();
    const TestComponent = () => {
      useOnUnmount(callback);
      return null;
    };

    const { unmount } = render(<TestComponent />);
    expect(callback).not.toHaveBeenCalled();

    unmount();
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it("should run the latest callback on unmount", () => {
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    const TestComponent = ({ cb }: { cb: () => void }) => {
      useOnUnmount(cb);
      return null;
    };

    const { rerender, unmount } = render(<TestComponent cb={callback1} />);
    rerender(<TestComponent cb={callback2} />);

    unmount();

    expect(callback1).not.toHaveBeenCalled();
    expect(callback2).toHaveBeenCalledTimes(1);
  });
});
