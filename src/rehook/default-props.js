/**
 * @param {Object} defaultProps
 * @returns {Object}
 */
const defaultProps = defaultProps => (props = {}) => ({
  ...defaultProps,
  ...props,
})

export default defaultProps
