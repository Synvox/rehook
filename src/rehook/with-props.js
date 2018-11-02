export default fn => props => ({
  ...props,
  ...(typeof fn === "function" ? fn(props) : fn)
});
