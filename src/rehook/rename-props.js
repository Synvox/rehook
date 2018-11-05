/**
 * @param {Object} propMap
 * @returns {Object}
 */
const renameProps = propMap => (props = {}) => ({
  // Remove renamed props
  ...Object.entries(props)
    .filter(([key]) => !(key in propMap))
    .reduce((obj, [k, v]) => Object.assign(obj, { [k]: v }), {}),
  // Rename props
  ...Object.entries(propMap)
    .map(([oldName, newName]) => [newName, props[oldName]])
    .reduce((obj, [k, v]) => Object.assign(obj, { [k]: v }), {}),
})

export default renameProps
