// @TODO build a demo site.

import React from 'react'

import { withState, pipe, withHandlers, namespace } from './rehook'

const setCountSymbol = Symbol('setCount')

const useCount = namespaceName =>
  namespace(namespaceName, () =>
    pipe(
      withState('count', setCountSymbol, 0),
      withHandlers({
        increment: ({ count, [setCountSymbol]: setCount }) => () =>
          setCount(count + 1),
        decrement: ({ count, [setCountSymbol]: setCount }) => () =>
          setCount(count - 1),
      })
    )
  )()

function Something() {
  const {
    counter: { count, increment, decrement },
  } = useCount('counter')

  return (
    <div>
      <button onClick={decrement}>-1</button>
      {count}
      <button onClick={increment}>+1</button>
    </div>
  )
}

export default Something
