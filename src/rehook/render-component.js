// @ts-check
/**
 * @param {any} comp
 * @returns {object}
 */
const renderComponent = comp => (props = {}) => {
  throw comp(props)
}

export default renderComponent
