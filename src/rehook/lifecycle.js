import { useEffect, useRef, useState } from "react";

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export default spec => props => {
  const [state, setStateRaw] = useState({});
  const setState = update =>
    setStateRaw({
      ...state,
      ...(typeof update === "function" ? update(state) : update)
    });

  if (spec.componentDidMount) {
    useEffect(() => {
      spec.componentDidMount.call({ props, state, setState });
    }, []);
  }

  if (spec.componentWillUnmount) {
    useEffect(() => {
      return () => {
        spec.componentWillUnmount.call({ props, state, setState });
      };
    }, []);
  }

  if (spec.componentDidUpdate) {
    const previousProps = usePrevious(props);
    useEffect(() => {
      spec.componentDidUpdate.call(
        { props, state, setState },
        previousProps,
        null,
        null
      );
    });
  }

  return { ...props, ...state };
};
