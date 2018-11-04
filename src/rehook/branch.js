// Note, branching disobeys one of the hook rules because
// it wraps hooks in a condition.

/**
 *
 * @param {Function} condition
 * @param {Function} left
 * @param {Function} right
 * @returns {Function}
 */
const branch = (condition, left, right = x => x) => props => {
  return condition(props) ? left(props) : right(props)
}

export default branch
