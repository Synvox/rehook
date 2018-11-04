/* eslint-env jest */

import testUtil from '../test-util'
import mapProps from '../map-props'

test('maps props', () => {
  const getProps = testUtil(mapProps(({ b }) => ({ b })), {
    a: true,
    b: false,
  })

  expect(getProps().a).toBe(undefined) //
  expect(getProps().b).toBe(false)
})
