import { useMemo, useRef, useEffect } from "react";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export default (shouldMapOrKeys, createProps) => props => {
  const previousProps = usePrevious(props);

  const keys = Array.isArray(shouldMapOrKeys)
    ? shouldMapOrKeys
    : shouldMapOrKeys(props, previousProps)
      ? [true]
      : undefined;

  const mappedProps = useMemo(() => createProps(props), keys);

  return {
    ...props,
    ...mappedProps
  };
};
