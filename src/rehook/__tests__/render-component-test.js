/* eslint-env jest */

import renderComponent from '../render-component'

test('render component', () => {
  let e

  try {
    renderComponent(() => 'something')()
  } catch (thrown) {
    e = thrown
  }

  expect(e).toBe('something')
})
