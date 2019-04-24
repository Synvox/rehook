// @ts-check
/**
 * @param {Function} fn
 * @returns {object}
 */
const mapProps = fn => (props = {}) => fn(props)

export default mapProps
