/* eslint-env jest */

import pipe from '../pipe'

test('pipe', () => {
  expect(
    pipe(
      num => num + 1,
      num => num + 1
    )(0)
  ).toBe(2)

  expect(
    pipe(
      () => ({ num: 0 }),
      x => ({ num: x.num + 1 })
    )()
  ).toEqual({ num: 1 })
})
