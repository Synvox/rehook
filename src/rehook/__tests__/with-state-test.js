/* eslint-env jest */

import testUtil from '../test-util'
import withState from '../with-state'

test('with state', () => {
  const getProps = testUtil(withState('state', 'setState', 0), { a: true })

  expect(getProps().state).toEqual(0)
  getProps().setState(1)
  expect(getProps().state).toEqual(1)
})

test('with state function', () => {
  let called = 0
  const getProps = testUtil(
    withState('state', 'setState', () => {
      called += 1
      return 0
    }),
    { a: true }
  )

  expect(getProps().state).toEqual(0)
  getProps().setState(1)
  expect(getProps().state).toEqual(1)
  expect(called).toEqual(1)
})
