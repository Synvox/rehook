import React from 'react'
// @ts-ignore
const { useMemo } = React

/**
 *
 * @param {Object} handlers
 * @returns {Object}
 */
const withHandlers = handlers => (props = {}) => {
  const realHandlers = useMemo(
    () => (typeof handlers === 'function' ? handlers(props) : handlers),
    []
  )

  const actionTypes = Object.keys(realHandlers)

  const boundHandlers = actionTypes.reduce(
    (obj, type) =>
      Object.assign(obj, {
        [type]: (...payload) => realHandlers[type](props)(...payload),
      }),
    {}
  )

  return { ...props, ...boundHandlers }
}

export default withHandlers
