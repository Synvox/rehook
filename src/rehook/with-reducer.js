import React from "react";
const { useReducer, useMemo } = React;

export default (stateName, dispatchName, reducer, initialValue) => props => {
  const [state, dispatch] = useReducer(
    reducer,
    typeof initialValue === "function"
      ? useMemo(() => initialValue(props), [])
      : initialValue
  );

  return { ...props, [stateName]: state, [dispatchName]: dispatch };
};
