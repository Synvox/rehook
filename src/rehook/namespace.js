/**
 * @param {string|symbol} propName
 * @param {Function} enhance
 * @returns {Object}
 */
const namespace = (propName, enhance) => (props = {}) => ({
  ...props,
  [propName]: enhance(props)(),
})

export default namespace
