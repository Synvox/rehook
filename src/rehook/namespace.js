// @ts-check
/**
 * @param {string|symbol} propName
 * @param {Function} enhance
 * @returns {object}
 */
const namespace = (propName, enhance) => (props = {}) => ({
  ...props,
  [propName]: enhance(props)(),
})

export default namespace
