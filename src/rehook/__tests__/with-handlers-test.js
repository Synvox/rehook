/* eslint-env jest */

import testUtil from '../test-util'
import withHandlers from '../with-handlers'

test('with handlers', () => {
  let result = null
  const getProps = testUtil(
    withHandlers({
      handle: ({ a }) => ({ b }) => (result = { a, b }),
    }),
    { a: true }
  )

  getProps().handle({ b: true })
  expect(result).toEqual({ a: true, b: true })
})

test('with handlers memo', () => {
  let result = null
  let called = 0
  const getProps = testUtil(
    withHandlers(() => {
      called += 1
      return {
        handle: ({ a }) => ({ b }) => (result = { a, b }),
      }
    }),
    { a: true }
  )

  getProps().handle({ b: true })
  expect(called).toBe(1)
  expect(result).toEqual({ a: true, b: true })
})
