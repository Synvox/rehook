import React from 'react'
// @ts-ignore
const { useMemo } = React

// Note, branching disobeys one of the hook rules because
// it wraps hooks in a condition. For this reason, the branch
// is cached and kept the same regardless of updates.

/**
 *
 * @param {Function} condition
 * @param {Function} left
 * @param {Function} right
 * @returns {Function}
 */
const branch = (condition, left, right = x => x) => (props = {}) => {
  const conditionResult = useMemo(() => condition(props), [])

  return conditionResult ? left(props) : right(props)
}

export default branch
