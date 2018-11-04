/* eslint-env jest */

import testUtil from '../test-util'
import flattenProp from '../flatten-prop'

test('flattens props', () => {
  const getProps = testUtil(flattenProp('obj'), { obj: { a: true, b: false } })

  expect(getProps().a).toBe(true)
  expect(getProps().b).toBe(false)
})
