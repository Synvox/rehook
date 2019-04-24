// @ts-check
/**
 * @param {Function|object} fn
 */
const withProps = fn => (props = {}) => ({
  ...props,
  ...(typeof fn === 'function' ? fn(props) : fn),
})

export default withProps
