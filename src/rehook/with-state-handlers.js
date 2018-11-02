import { useReducer, useMemo } from "react";

export default (initialValue, handlers) => props => {
  const actionTypes = Object.keys(handlers);

  const reducer = (state, action) => {
    if (!actionTypes.includes(action.type)) return state;

    return { ...state, ...handlers[action.type](state, props)(action.payload) };
  };

  const [state, dispatch] = useReducer(
    reducer,
    typeof initialValue === "function"
      ? useMemo(() => initialValue(props))
      : initialValue
  );

  const boundHandlers = actionTypes.reduce(
    (obj, type) =>
      Object.assign(obj, {
        [type]: payload => {
          if (payload !== undefined) dispatch({ type, payload });
        }
      }),
    {}
  );

  return { ...props, ...state, ...boundHandlers };
};
