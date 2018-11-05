/* eslint-env jest */

import testUtil from '../test-utils'
import withReducer from '../with-reducer'

test('with state handlers', () => {
  const getProps = testUtil(
    withReducer(
      'state',
      'dispatch',
      (state, action) => {
        switch (action.type) {
          case 'INCREMENT':
            return { count: state.count + 1 }
          default:
            return state
        }
      },
      { count: 0 }
    ),
    {}
  )

  expect(getProps().state).toEqual({ count: 0 })
  getProps().dispatch({ type: 'INCREMENT' })
  expect(getProps().state).toEqual({ count: 1 })
})

test('with state handlers memo', () => {
  const getProps = testUtil(
    withReducer(
      'state',
      'dispatch',
      (state, action) => {
        switch (action.type) {
          case 'INCREMENT':
            return { count: state.count + 1 }
          default:
            return state
        }
      },
      () => ({ count: 0 })
    ),
    {}
  )

  expect(getProps().state).toEqual({ count: 0 })
  getProps().dispatch({ type: 'INCREMENT' })
  expect(getProps().state).toEqual({ count: 1 })
})
