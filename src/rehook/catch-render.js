import React from 'react'

/**
 * @param {Function} component
 * @returns {Object}
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
    component.displayName || component.name || 'Component'

  return newComponent
}

export default catchRender
