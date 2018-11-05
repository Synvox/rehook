/**
 *
 * @param {Function|Object} fn
 */
const withProps = fn => (props = {}) => ({
  ...props,
  ...(typeof fn === 'function' ? fn(props) : fn),
})

export default withProps
