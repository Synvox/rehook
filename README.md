# Rehook

Rehook implements an API similar to [Recompose](https://github.com/acdlite/recompose), but using hooks.

```
npm i @synvox/rehook
```

## Explanation

Hooks are a great idea and I want to migrate from Recompose to React hooks. React hooks can do _almost_ everything recompose can do, but without wrapping components in other components.

## Why is this a thing?

Before Promises, JavaScript developers used a pattern called “error first callbacks”. Callbacks are flexible and easy to understand, but not composable. This lead to “the callback pyramid of doom” where callbacks were called in callbacks.

When promises were introduced, suddenly developers were able to chain asynchronous code together with `.then()`. This was great and simplified asynchronous code. Callbacks still exist (and should) because they are often the best tool for the job. Promises are composable, but are more difficult to reason about than a single callback.

Then the JavaScript community got `async/await`. It was like magic! Suddenly we could write asynchronous code imperatively, and it used promises under the hood. This was important because Promise based logic could be easily reused with `async/await`.

_In React, we’re undergoing the same renaissance._ Higher Order Components are like Promises: easily composable, not easily understood. Render Props are like callbacks: understandable, flexible, not easily composable. Reach hooks are like `async/await`. Suddenly we can write understandable, composable logic and decouple reusable logic from components.

There are tons of higher order component code written with Recompose, that could (and should) use hooks instead, but there is no migration plan. Luckily recompose in an implementation of functional mixins on React components. We can recreate this interface but use hooks instead of components. _This enables the usage your existing Recompose enhancers as hooks_, similar to how you can use your existing Promise based code with async/await.

_With Rehook_

```js
import React from "react";

import { rehook, withState, pipe, withHandlers } from "@synvox/rehook";

const enhance = pipe(
  withState("count", "setCount", 0),
  withHandlers({
    increment: ({ count, setCount }) => () => setCount(count + 1),
    decrement: ({ count, setCount }) => () => setCount(count - 1)
  })
);

function Something({ count, increment, decrement }) {
  return (
    <div>
      <button onClick={decrement}>-1</button>
      {count}
      <button onClick={increment}>+1</button>
    </div>
  );
}

export default rehook(Something, enhance);
```

_With Recompose_

```js
import React from "react";

import { compose, withState, withHandlers } from "recompose";

const enhance = compose(
  withState("count", "setCount", 0),
  withHandlers({
    increment: ({ count, setCount }) => () => setCount(count + 1),
    decrement: ({ count, setCount }) => () => setCount(count - 1)
  })
);

function Something({ count, increment, decrement }) {
  return (
    <div>
      <button onClick={decrement}>-1</button>
      {count}
      <button onClick={increment}>+1</button>
    </div>
  );
}

export default enhance(Something);
```

Notice how subtle the changes are.

## Docs

_Full disclaimer: Most of these docs are modified from the Recompose docs._

- [`rehook()`](#rehook-1)
- [`pipe()`](#pipe)
- [`mapProps()`](#mapprops)
- [`withProps()`](#withprops)
- [`withPropsOnChange()`](#withpropsonchange)
- [`withHandlers()`](#withhandlers)
- [`defaultProps()`](#defaultprops)
- [`renameProp()`](#renameprop)
- [`renameProps()`](#renameprops)
- [`flattenProp()`](#flattenprop)
- [`withState()`](#withstate)
- [`withStateHandlers()`](#withstatehandlers)
- [`withReducer()`](#withreducer)
- [`branch()`](#branch)
- [`renderComponent()`](#rendercomponent)
- [`renderNothing()`](#rendernothing)
- [`lifecycle()`](#lifecycle)

### `rehook()`

```js
rehook(
  component: (props: Object) => ReactElement
  ?enhancer: (props: Object) => Object
): FunctionComponent
```

Accepts a function component and creates a function component and optionally runs props through a specified enhancer.

### `pipe()`

```js
pipe(...functions: Array<Function>): Function
```

In recompose, you `compose` enhancers. In `rehook` each enhancer is a function that takes `props` and returns new `props`. Use `pipe` instead of `compose` to chain these together.

### `mapProps()`

```js
mapProps(
  propsMapper: (ownerProps: Object) => Object,
): (props: Object) => Object
```

Accepts a function that maps owner props to a new collection of props that are passed to the base component.

### `withProps()`

```js
withProps(
  createProps: (ownerProps: Object) => Object | Object
): (props: Object) => Object
```

Like `mapProps()`, except the newly created props are merged with the owner props.

Instead of a function, you can also pass a props object directly. In this form, it is similar to `defaultProps()`, except the provided props take precedence over props from the owner.

### `withPropsOnChange()`

```js
withPropsOnChange(
  shouldMapOrKeys: Array<string> | (props: Object, nextProps: Object) => boolean,
  createProps: (ownerProps: Object) => Object
): (props: Object) => Object
```

Like `withProps()`, except the new props are only created when one of the owner props specified by `shouldMapOrKeys` changes. This helps ensure that expensive computations inside `createProps()` are only executed when necessary.

Instead of an array of prop keys, the first parameter can also be a function that returns a boolean, given the current props and the next props. This allows you to customize when `createProps()` should be called.

### `withHandlers()`

```js
withHandlers(
  handlerCreators: {
    [handlerName: string]: (props: Object) => Function
  } |
  handlerCreatorsFactory: (initialProps) => {
    [handlerName: string]: (props: Object) => Function
  }
): (props: Object) => Object
```

Takes an object map of handler creators or a factory function. These are higher-order functions that accept a set of props and return a function handler:

This allows the handler to access the current props via closure, without needing to change its signature.

Usage example:

```js
const enhance = pipe(
  withState("value", "updateValue", ""),
  withHandlers({
    onChange: props => event => {
      props.updateValue(event.target.value);
    },
    onSubmit: props => event => {
      event.preventDefault();
      submitForm(props.value);
    }
  })
);

const Component = ({ value, onChange, onSubmit }) => {
  <form onSubmit={onSubmit}>
    <label>
      Value
      <input type="text" value={value} onChange={onChange} />
    </label>
  </form>;
};

const Form = rehook(Component, enhance);
```

### `defaultProps()`

```js
defaultProps(
  props: Object
): (props: Object) => Object
```

Specifies props to be included by default. Similar to `withProps()`, except the props from the owner take precedence over props provided to `defaultProps()`.

### `renameProp()`

```js
renameProp(
  oldName: string,
  newName: string
): (props: Object) => Object
```

Renames a single prop.

### `renameProps()`

```js
renameProps(
  nameMap: { [key: string]: string }
): (props: Object) => Object
```

Renames multiple props, using a map of old prop names to new prop names.

### `flattenProp()`

```js
flattenProp(
  propName: string
): (props: Object) => Object
```

Flattens a prop so that its fields are spread out into the props object.

```js
const enhance = pipe(
  withProps({
    object: { a: "a", b: "b" },
    c: "c"
  }),
  flattenProp("object")
);
const Abc = rehook(BaseComponent, enhance);

// Base component receives props: { a: 'a', b: 'b', c: 'c', object: { a: 'a', b: 'b' } }
```

### `withState()`

```js
withState(
  stateName: string,
  stateUpdaterName: string,
  initialState: any | (props: Object) => any
): (props: Object) => Object
```

Includes two additional props: a state value, and a function to update that state value. The state updater has the following signature:

```js
stateUpdater<T>((prevValue: T) => T, ?callback: Function): void
stateUpdater(newValue: any, ?callback: Function): void
```

The first form accepts a function which maps the previous state value to a new state value. You'll likely want to use this state updater along with `withHandlers()` to create specific updater functions. For example, to create an enhancer that adds basic counting functionality to a component:

```js
const addCounting = pipe(
  withState("counter", "setCounter", 0),
  withHandlers({
    increment: ({ setCounter }) => () => setCounter(n => n + 1),
    decrement: ({ setCounter }) => () => setCounter(n => n - 1),
    reset: ({ setCounter }) => () => setCounter(0)
  })
);
```

The second form accepts a single value, which is used as the new state.

Both forms accept an optional second parameter, a callback function that will be executed once `setState()` is completed and the component is re-rendered.

An initial state value is required. It can be either the state value itself, or a function that returns an initial state given the initial props.

### `withStateHandlers()`

```js
withStateHandlers(
  (initialState: Object | ((props: Object) => any)),
  (stateUpdaters: {
    [key: string]: (
      state: Object,
      props: Object
    ) => (...payload: any[]) => Object
  })
);
```

Passes state object properties and immutable updater functions
in a form of `(...payload: any[]) => Object`.

Every state updater function accepts state, props and payload and must return a new state or undefined. The new state is shallowly merged with the previous state.
Returning undefined does not cause a component rerender.

Example:

```js
const enhance = withStateHandlers(
  ({ initialCounter = 0 }) => ({
    counter: initialCounter
  }),
  {
    incrementOn: ({ counter }) => value => ({
      counter: counter + value
    }),
    decrementOn: ({ counter }) => value => ({
      counter: counter - value
    }),
    resetCounter: (_, { initialCounter = 0 }) => () => ({
      counter: initialCounter
    })
  }
);

const Component = ({ counter, incrementOn, decrementOn, resetCounter }) => (
  <div>
    <Button onClick={() => incrementOn(2)}>Inc</Button>
    <Button onClick={() => decrementOn(3)}>Dec</Button>
    <Button onClick={resetCounter}>Reset</Button>
  </div>
);

const Counter = rehook(Component, enhance);
```

### `withReducer()`

```js
withReducer<S, A>(
  stateName: string,
  dispatchName: string,
  reducer: (state: S, action: A) => S,
  initialState: S | (ownerProps: Object) => S
): (props: Object) => Object
```

Similar to `withState()`, but state updates are applied using a reducer function. A reducer is a function that receives a state and an action, and returns a new state.

Passes two additional props to the base component: a state value, and a dispatch method. The dispatch method has the following signature:

```js
dispatch(action: Object, ?callback: Function): void
```

It sends an action to the reducer, after which the new state is applied. It also accepts an optional second parameter, a callback function with the new state as its only argument.

### `branch()`

```js
branch(
  test: (props: Object) => boolean,
  left: (props: Object) => Object,
  right: ?(props: Object) => Object
): (props: Object) => Object
```

Accepts a test function and two functions. The test function is passed the props from the owner. If it returns true, the `left` function called with `props`; otherwise, the `right` function is called with `props`. If the `right` is not supplied, it will return `props` like normal.

### `renderComponent()`

```js
renderComponent(
  Component: ReactClass | ReactFunctionalComponent | string
): (props: Object) => Object
```

> `renderComponent()` is a tricky enhancer to implement with hooks. 😔 It will `throw` a component to signal to `rehook()` that it should stop the function and render that component. This sometimes causes issues with hook’s positional state system. It is advised to use `renderComponent()` after stateful enhancers like `withState` and after effect handlers like `lifecycle`. React will throw an error if this is called too soon.

This is useful in combination with another enhancer like `branch()`:

```js
// `isLoading()` is a function that returns whether or not the component
// is in a loading state
const spinnerWhileLoading = isLoading =>
  branch(
    isLoading,
    renderComponent(Spinner) // `Spinner` is a React component
  );

// Now use the `spinnerWhileLoading()` helper to add a loading spinner to any
// base component
const enhance = spinnerWhileLoading(
  props => !(props.title && props.author && props.content)
);

const Post = ({ title, author, content }) => (
  <article>
    <h1>{title}</h1>
    <h2>By {author.name}</h2>
    <div>{content}</div>
  </article>
);

export default rehook(Post, enhance);
```

### `renderNothing()`

```js
renderNothing: (props: Object) => Object;
```

An enhancer that always renders `null`.

> `renderComponent()` is a tricky enhancer to implement with hooks. 😔 It will `throw` a component to signal to `rehook()` that it should stop the function and render that component. This sometimes causes issues with hook’s positional state system. It is advised to use `renderComponent()` after stateful enhancers like `withState` and after effect handlers like `lifecycle`. React will throw an error if this is called too soon.

This is useful in combination with another helper that expects a higher-order component, like `branch()`:

```js
// `hasNoData()` is a function that returns true if the component has
// no data
const hideIfNoData = hasNoData => branch(hasNoData, renderNothing);

// Now use the `hideIfNoData()` helper to hide any base component
const enhance = hideIfNoData(
  props => !(props.title && props.author && props.content)
);
const Post = ({ title, author, content }) => (
  <article>
    <h1>{title}</h1>
    <h2>By {author.name}</h2>
    <div>{content}</div>
  </article>
);

export default rehook(Post, enhance);
```

### `lifecycle()`

```js
lifecycle(
  spec: Object,
): (props: Object) => Object
```

Lifecycle supports `componentDidMount`, `componentWillUnmount`, `componentDidUpdate`.

Any state changes made in a lifecycle method, by using `setState`, will be merged with props.

Example:

```js
const PostsList = ({ posts }) => (
  <ul>
    {posts.map(p => (
      <li>{p.title}</li>
    ))}
  </ul>
);

const enhance = lifecycle({
  componentDidMount() {
    fetchPosts().then(posts => {
      this.setState({ posts });
    });
  }
});

export default rehook(PostsList, enhance);
```
