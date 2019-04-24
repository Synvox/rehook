# Rehook

[![Build Status](https://travis-ci.org/Synvox/rehook.svg?branch=master)](https://travis-ci.org/Synvox/rehook)

Rehook implements an API similar to [Recompose](https://github.com/acdlite/recompose), but using React Hooks.

```
npm i @synvox/rehook
```

## What is Rehook?

Hooks are a great idea and I want to migrate my enhancers from Recompose to React Hooks.

React Hooks can do most of what Recompose can do, but without wrapping components in other components. This is a huge win! But what happens to all the code written to use recompose? Rehook is a migration strategy from higher order components to hooks.

_With Rehook_

```js
import React from 'react'

import { withState, pipe, withHandlers } from '@synvox/rehook'

const useCount = pipe(
  withState('count', 'setCount', 0),
  withHandlers({
    increment: ({ count, setCount }) => () => setCount(count + 1),
    decrement: ({ count, setCount }) => () => setCount(count - 1),
  })
)

function Counter() {
  const { count, increment, decrement } = useCount()

  return (
    <div>
      <button onClick={decrement}>-1</button>
      {count}
      <button onClick={increment}>+1</button>
    </div>
  )
}

export default Counter
```

_With Recompose_

```js
import React from 'react'

import { compose, withState, withHandlers } from 'recompose'

const enhance = compose(
  withState('count', 'setCount', 0),
  withHandlers({
    increment: ({ count, setCount }) => () => setCount(count + 1),
    decrement: ({ count, setCount }) => () => setCount(count - 1),
  })
)

function Counter({ count, increment, decrement }) {
  return (
    <div>
      <button onClick={decrement}>-1</button>
      {count}
      <button onClick={increment}>+1</button>
    </div>
  )
}

export default enhance(Counter)
```

Notice how subtle the changes are.

### Smart/Presentational Components:

In Recompose, you are required to pass all props through each component until it reaches your presentational component. This is not the case with Rehook, but you may choose run all your props through an enhancer using `pipe()`. This will look more familiar to those who have used recompose before.

```js
import React from 'react'

import { withState, pipe, withHandlers } from '@synvox/rehook'

const enhance = pipe(
  withState('count', 'setCount', 0),
  withHandlers({
    increment: ({ count, setCount }) => () => setCount(count + 1),
    decrement: ({ count, setCount }) => () => setCount(count - 1),
  })
)

function Counter({ count, increment, decrement }) {
  return (
    <div>
      <button onClick={decrement}>-1</button>
      {count}
      <button onClick={increment}>+1</button>
    </div>
  )
}

export default pipe(
  enhance,
  Counter
)
```

## Docs

_Full disclaimer: Most of these docs are modified from the Recompose docs._

- [`pipe()`](#pipe)
- [`mapProps()`](#mapprops)
- [`withProps()`](#withprops)
- [`withPropsOnChange()`](#withpropsonchange)
- [`withHandlers()`](#withhandlers)
- [`namespace()`](#withhandlers)
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
- [`catchRender()`](#rehook-1)
- [`lifecycle()`](#lifecycle)

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
const useForm = pipe(
  withState('value', 'updateValue', ''),
  withHandlers({
    onChange: props => event => {
      props.updateValue(event.target.value)
    },
    onSubmit: props => event => {
      event.preventDefault()
      submitForm(props.value)
    },
  })
)

function Form() {
  const { value, onChange, onSubmit } = useForm()

  return (
    <form onSubmit={onSubmit}>
      <label>
        Value
        <input type="text" value={value} onChange={onChange} />
      </label>
    </form>
  )
}
```

### `namespace()`

```js
namespace(
  namespaceKey: string | symbol,
  createProps: (ownerProps: Object) => () => Object
): (props: Object) => Object
```

The namespace function allows you to scope an enhancer at a key. It does the opposite of `flattenProp()`, by assigning the result of a call to a key specified by `namespaceKey` on the props object.

Usage Example:

```js
const useForm = pipe(
  withState('value', 'updateValue', ''),
  namespace('handlers', parentProps =>
    pipe(
      withHandlers({
        onChange: props => event => {
          parentProps.updateValue(event.target.value)
        },
        onSubmit: props => event => {
          event.preventDefault()
          submitForm(parentProps.value)
        },
      })
    )
  )
)

function Form() {
  const {
    value,
    handlers: { onChange, onSubmit },
  } = useForm()

  return (
    <form onSubmit={onSubmit}>
      <label>
        Value
        <input type="text" value={value} onChange={onChange} />
      </label>
    </form>
  )
}
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
const useProps = pipe(
  withProps({
    object: { a: 'a', b: 'b' },
    c: 'c',
  }),
  flattenProp('object')
)

// useProps() returns: { a: 'a', b: 'b', c: 'c', object: { a: 'a', b: 'b' } }
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
  withState('counter', 'setCounter', 0),
  withHandlers({
    increment: ({ setCounter }) => () => setCounter(n => n + 1),
    decrement: ({ setCounter }) => () => setCounter(n => n - 1),
    reset: ({ setCounter }) => () => setCounter(0),
  })
)
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
    ) => (...payload: any[]) => Object,
  })
)
```

Passes state object properties and immutable updater functions
in a form of `(...payload: any[]) => Object`.

Every state updater function accepts state, props and payload and must return a new state or undefined. The new state is shallowly merged with the previous state.
Returning undefined does not cause a component rerender.

Example:

```js
const useCounter = withStateHandlers(
  ({ initialCounter = 0 }) => ({
    counter: initialCounter,
  }),
  {
    incrementOn: ({ counter }) => value => ({
      counter: counter + value,
    }),
    decrementOn: ({ counter }) => value => ({
      counter: counter - value,
    }),
    resetCounter: (_, { initialCounter = 0 }) => () => ({
      counter: initialCounter,
    }),
  }
)

function Counter() {
  const { counter, incrementOn, decrementOn, resetCounter } = useCounter()

  return (
    <div>
      <Button onClick={() => incrementOn(2)}>Inc</Button>
      <Button onClick={() => decrementOn(3)}>Dec</Button>
      <Button onClick={resetCounter}>Reset</Button>
    </div>
  )
}
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

Stops the function execution and renders a component. Use with `catchRender()`.

> `renderComponent()` is a tricky enhancer to implement with hooks. 😔 It will `throw` a component to signal to `rehook()` that it should stop the function and render that component. This sometimes causes issues with hook’s positional state system. It is advised to use `renderComponent()` after stateful enhancers like `withState` and after effect handlers like `lifecycle`. React will throw an error if this is called too soon.

This is useful in combination with another enhancer like `branch()`:

```js
// `isLoading()` is a function that returns whether or not the component
// is in a loading state
const spinnerWhileLoading = isLoading =>
  branch(
    isLoading,
    renderComponent(Spinner) // `Spinner` is a React component
  )

// Now use the `spinnerWhileLoading()` helper to add a loading spinner to any
// base component
const break = spinnerWhileLoading(
  props => !(props.title && props.author && props.content)
)

const Post = catchRender((props) => {
  useSpinner(props)
  const { title, author, content } = props

 	return (
	  <article>
	    <h1>{title}</h1>
	    <h2>By {author.name}</h2>
	    <div>{content}</div>
	  </article>
	)
})

export default Post
```

### `renderNothing()`

```js
renderNothing: (props: Object) => Object
```

An enhancer that always renders `null`. Use with `catchRender()`.

> `renderNothing()` is a tricky enhancer to implement with hooks. 😔 It will `throw` a component to signal to `rehook()` that it should stop the function and render that component. This sometimes causes issues with hook’s positional state system. It is advised to use `renderNothing()` after stateful enhancers like `withState` and after effect handlers like `lifecycle`. React will throw an error if this is called too soon.

This is useful in combination with another helper that expects a higher-order component, like `branch()`:

```js
// `hasNoData()` is a function that returns true if the component has
// no data
const hideIfNoData = hasNoData => branch(hasNoData, renderNothing)

// Now use the `hideIfNoData()` helper to hide any base component
const useHidden = hideIfNoData(
  props => !(props.title && props.author && props.content)
)

const Post = catchRender(props => {
  useHidden(props)
  const { title, author, content } = props

  return (
    <article>
      <h1>{title}</h1>
      <h2>By {author.name}</h2>
      <div>{content}</div>
    </article>
  )
})

export default Post
```

### `catchRender()`

```js
catchRender(
  component: (props: Object) => ReactElement
): FunctionComponent
```

If you use `renderComponent()` or `renderNothing()` wrap your function component with with `catchRender()`.

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
const usePosts = lifecycle({
  componentDidMount() {
    fetchPosts().then(posts => {
      this.setState({ posts })
    })
  },
})

function PostsList() {
  const { posts = [] } = usePosts()

  return (
    <ul>
      {posts.map(p => (
        <li>{p.title}</li>
      ))}
    </ul>
  )
}
```

### Test Utility:

Rehook also provides a test utility for testing enhancers. This makes writing tests easy and readable. This depends on `enzyme`.

Usage Example:

```js
import testEnhancer from '@synvox/rehook/test-utils'

// Somehow import your enhancer:
const enhancer = withState('state', 'setState', 0)

test('with state', () => {
  const getProps = testEnhancer(enhancer)

  expect(getProps().state).toEqual(0)
  getProps().setState(1)
  expect(getProps().state).toEqual(1)
})
```
