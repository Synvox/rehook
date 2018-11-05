/**
 * @param {string|symbol} propName
 * @returns {Object}
 */
const flattenProp = propName => (props = {}) => ({
  ...props,
  ...props[propName],
})

export default flattenProp
