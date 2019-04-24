/* eslint-env jest */

import testUtil from '../test-utils'
import withStateHandlers from '../with-state-handlers'
import { act } from 'react-dom/test-utils'

test('with state handlers', () => {
  const getProps = testUtil(
    withStateHandlers(
      { b: false },
      {
        handle: () => ({ b }) => ({ b }),
      }
    ),
    {}
  )

  act(() => getProps().handle({ b: true }))
  expect(getProps().b).toEqual(true)
})

test('with state handlers calling undefined', () => {
  const getProps = testUtil(
    withStateHandlers(
      { b: false },
      {
        handle: () => () => undefined,
      }
    ),
    {}
  )

  act(() => getProps().handle())
  expect(getProps().b).toEqual(false)
})

test('with state handlers memo', () => {
  const getProps = testUtil(
    withStateHandlers(() => ({ b: false }), {
      handle: () => ({ b }) => ({ b }),
    }),
    {}
  )

  act(() => getProps().handle({ b: true }))
  expect(getProps().b).toEqual(true)
})
