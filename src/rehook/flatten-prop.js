/**
 * @param {string} propName
 * @returns {Object}
 */
const flattenProp = propName => props => ({ ...props, ...props[propName] });

export default flattenProp;
