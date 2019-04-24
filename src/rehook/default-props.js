// @ts-check
/**
 * @param {object} defaultProps
 * @returns {object}
 */
const defaultProps = defaultProps => (props = {}) => ({
  ...defaultProps,
  ...props,
})

export default defaultProps
