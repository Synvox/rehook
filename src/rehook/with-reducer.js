// @ts-check
import { useReducer, useMemo } from 'react'

/**
 * @param {string|symbol} stateName
 * @param {string|symbol} dispatchName
 * @param {(prevState: any, action: any)=>any} reducer
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
