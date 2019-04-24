// @ts-check
/**
 * @param {string|symbol} a
 * @param {string|symbol} b
 * @returns {object}
 */
const renameProp = (a, b) => ({ [a]: prop, ...props } = {}) => ({
  ...props,
  [b]: prop,
})

export default renameProp
