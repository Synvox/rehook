import React from "react";
const { useEffect, useRef, useState } = React;

function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  });

  return ref.current;
}

export default spec => props => {
  const [state, setStateRaw] = useState({});
  const setState = update => {
    setStateRaw({
      ...state,
      ...(typeof update === "function" ? update(state) : update)
    });
  };

  const self = { props, state, setState };

  if (spec.componentDidMount) {
    useEffect(() => {
      spec.componentDidMount.call(self);
    }, []);
  }

  if (spec.componentWillUnmount) {
    useEffect(() => {
      return () => {
        spec.componentWillUnmount.call(self);
      };
    }, []);
  }

  if (spec.componentDidUpdate) {
    const previousProps = usePrevious(props);
    useEffect(() => {
      spec.componentDidUpdate.call(self, previousProps, null, null);
    });
  }

  return { ...props, ...state };
};
