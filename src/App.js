import React from "react";
import { rehook, withState, pipe, withHandlers } from "./rehook";

const enhancer = pipe(
  withState("count", "setCount", 0),
  withHandlers({
    increment: ({ count, setCount }) => () => setCount(count + 1),
    decrement: ({ count, setCount }) => () => setCount(count - 1)
  })
);

/**
 * @param {{children:any}} props
 */
function Something({ children }) {
  const { count, increment, decrement } = enhancer();
  return (
    <div>
      <button onClick={decrement}>-1</button>
      {count}
      <button onClick={increment}>+1</button>
      {children}
    </div>
  );
}

export default rehook(Something);
