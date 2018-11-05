/**
 * @param {any} comp
 * @returns {Object}
 */
const renderComponent = comp => (props = {}) => {
  throw comp(props)
}

export default renderComponent
