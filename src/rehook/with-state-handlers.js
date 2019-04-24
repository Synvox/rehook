import { useReducer, useMemo } from 'react'

/**
 * @param {any} initialValue
 * @param {object} handlers
 * @returns {object}
 */
const withStateHandlers = (initialValue, handlers) => (props = {}) => {
  const actionTypes = Object.keys(handlers)

  const reducer = (state, action) => {
    return {
      ...state,
      ...handlers[action.type](state, props)(...action.payload),
    }
  }

  const [state, dispatch] = useReducer(
    reducer,
    typeof initialValue === 'function'
      ? useMemo(() => initialValue(props), [])
      : initialValue
  )

  const boundHandlers = actionTypes.reduce(
    (obj, type) =>
      Object.assign(obj, {
        [type]: (...payload) => {
          if (payload !== undefined) dispatch({ type, payload })
        },
      }),
    {}
  )

  return { ...props, ...state, ...boundHandlers }
}

export default withStateHandlers
