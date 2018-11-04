/* eslint-env jest */

import testUtil from '../test-util'
import withProps from '../with-props'

test('maps props', () => {
  const getProps = testUtil(withProps(({ b }) => ({ b })), {
    a: true,
    b: false,
  })

  expect(getProps().a).toBe(true)
  expect(getProps().b).toBe(false)
})
