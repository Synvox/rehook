// @ts-check
/**
 * @param {string|symbol} propName
 * @returns {object}
 */
const flattenProp = propName => (props = {}) => ({
  ...props,
  ...props[propName],
})

export default flattenProp
