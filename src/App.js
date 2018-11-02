import React from "react";

import { rehook, withState, pipe, withHandlers } from "@synvox/rehook";

const enhancer = pipe(
  withState("count", "setCount", 0),
  withHandlers({
    increment: ({ count, setCount }) => () => setCount(count + 1),
    decrement: ({ count, setCount }) => () => setCount(count - 1)
  })
);

function Something({ count, increment, decrement }) {
  return (
    <div>
      <button onClick={decrement}>-1</button>
      {count}
      <button onClick={increment}>+1</button>
    </div>
  );
}

export default rehook(Something, enhancer);
