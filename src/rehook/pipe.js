/**
 * @param  {...Function} fns
 * @returns {Object}
 */
const pipe = (...fns) => (x = {}) => fns.reduce((v, f) => f(v), x);

export default pipe;
