export default propName => props => ({ ...props, ...props[propName] });
