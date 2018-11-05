/* eslint-env jest */

import testUtil from '../test-utils'
import flattenProp from '../flatten-prop'

test('flattens props', () => {
  const getProps = testUtil(flattenProp('obj'), { obj: { a: true, b: false } })

  expect(getProps().a).toBe(true)
  expect(getProps().b).toBe(false)
})
