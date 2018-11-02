import { useState, useMemo } from "react";

export default (stateName, stateUpdaterName, initialState) => props => {
  const [state, update] = useState(
    typeof initialState === "function"
      ? useMemo(() => initialState(props))
      : initialState
  );

  return {
    ...props,
    [stateName]: state,
    [stateUpdaterName]: update
  };
};
