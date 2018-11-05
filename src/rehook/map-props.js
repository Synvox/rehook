/**
 * @param {Function} fn
 * @returns {Object}
 */
const mapProps = fn => (props = {}) => fn(props)

export default mapProps
