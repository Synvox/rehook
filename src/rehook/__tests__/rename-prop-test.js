/* eslint-env jest */

import testUtil from '../test-util'
import renameProp from '../rename-prop'

test('branch left', () => {
  const getProps = testUtil(renameProp('val', 'renamed'), { val: true })

  expect(getProps().renamed).toBe(true)
})
