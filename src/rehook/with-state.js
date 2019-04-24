import { useState, useMemo } from 'react'

/**
 * @param {string|symbol} stateName
 * @param {string|symbol} stateUpdaterName
 * @param {any} initialState
 */
const withState = (stateName, stateUpdaterName, initialState) => (
  props = {}
) => {
  const [state, update] = useState(
    typeof initialState === 'function'
      ? useMemo(() => initialState(props), [])
      : initialState
  )

  return {
    ...props,
    [stateName]: state,
    [stateUpdaterName]: update,
  }
}

export default withState
