import { useReducer, useMemo } from "react";

export default (stateName, dispatchName, reducer, initialValue) => props => {
  const [state, dispatch] = useReducer(
    reducer,
    typeof initialValue === "function"
      ? useMemo(() => initialValue(props))
      : initialValue
  );

  return { ...props, [stateName]: state, [dispatchName]: dispatch };
};
