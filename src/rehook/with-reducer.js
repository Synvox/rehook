import React from 'react'
// @ts-ignore
const { useReducer, useMemo } = React

/**
 *
 * @param {string|symbol} stateName
 * @param {string|symbol} dispatchName
 * @param {Function} reducer
 * @param {any} initialValue
 */
const withReducer = (
  stateName,
  dispatchName,
  reducer,
  initialValue
) => props => {
  const [state, dispatch] = useReducer(
    reducer,
    typeof initialValue === 'function'
      ? useMemo(() => initialValue(props), [])
      : initialValue
  )

  return { ...props, [stateName]: state, [dispatchName]: dispatch }
}

export default withReducer
