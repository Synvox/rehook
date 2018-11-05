/**
 * @param {string|symbol} a
 * @param {string|symbol} b
 * @returns {Object}
 */
const renameProp = (a, b) => ({ [a]: prop, ...props } = {}) => ({
  ...props,
  [b]: prop,
})

export default renameProp
