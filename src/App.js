// @TODO build a demo site.

import React from "react";

import { withState, pipe, withHandlers } from "./rehook";

const useCount = pipe(
  withState("count", "setCount", 0),
  withHandlers({
    increment: ({ count, setCount }) => () => setCount(count + 1),
    decrement: ({ count, setCount }) => () => setCount(count - 1)
  })
);

function Something() {
  const { count, increment, decrement } = useCount();

  return (
    <div>
      <button onClick={decrement}>-1</button>
      {count}
      <button onClick={increment}>+1</button>
    </div>
  );
}

export default Something;
