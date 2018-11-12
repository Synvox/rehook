import React from 'react'
// @ts-ignore
const { useReducer, useMemo } = React

/**
 *
 * @param {any} initialValue
 * @param {Object} handlers
 * @returns {Object}
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
