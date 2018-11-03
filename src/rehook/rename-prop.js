/**
 * @param {string} a
 * @param {string} b
 * @returns {Object}
 */
const renameProp = (a, b) => ({ [a]: prop, ...props }) => ({
  ...props,
  [b]: prop
});

export default renameProp;
