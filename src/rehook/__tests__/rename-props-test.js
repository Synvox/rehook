/* eslint-env jest */

import testUtil from '../test-util'
import renameProps from '../rename-props'

test('branch left', () => {
  const getProps = testUtil(renameProps({ val: 'renamed', val2: 'renamed2' }), {
    val: true,
    val2: 0,
    other: false,
  })

  expect(getProps().renamed).toBe(true)
  expect(getProps().renamed2).toBe(0)
  expect(getProps().other).toBe(false)
})
