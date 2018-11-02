// Note, branching disobeys one of the hook rules because
// it wraps hooks in a condition.

export default (condition, left, right = x => x) => props => {
  return condition(props) ? left(props) : right(props);
};
