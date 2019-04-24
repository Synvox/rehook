// @ts-check
import React from 'react'

/**
 * @param {Function} component
 * @returns {object}
 */
const catchRender = component => {
  const newComponent = (props = {}) => {
    let result = null

    try {
      result = component(props)
    } catch (e) {
      if (typeof e !== 'object' || React.isValidElement(e)) result = e
      else throw e
    }

    return result
  }

  newComponent.displayName =
    // @ts-ignore
    component.displayName || component.name || 'Component'

  return newComponent
}

export default catchRender
