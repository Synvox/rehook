/* eslint-env jest */

import testUtil from '../test-utils'
import pipe from '../pipe'
import withState from '../with-state'
import withPropsOnChange from '../with-props-on-change'
import { act } from 'react-dom/test-utils'

test('maps props using fn true', () => {
  let called = 0
  const getProps = testUtil(
    pipe(
      withState('b', 'setB', 0),
      withPropsOnChange(
        () => true,
        ({ b }) => {
          called += 1
          return { c: b }
        }
      )
    ),
    {
      a: true,
    }
  )

  expect(getProps().a).toBe(true)
  expect(getProps().b).toBe(0)
  expect(called).toBe(1)
  act(() => getProps().setB(1))
  expect(called).toBe(2)
  expect(getProps().a).toBe(true)
  expect(getProps().c).toBe(1)
})

test('maps props using fn false', () => {
  let called = 0
  const getProps = testUtil(
    pipe(
      withState('b', 'setB', 0),
      withPropsOnChange(
        () => false,
        ({ b }) => {
          called += 1
          return { c: b }
        }
      )
    ),
    {
      a: true,
    }
  )

  expect(getProps().a).toBe(true)
  expect(getProps().b).toBe(0)
  expect(called).toBe(1)
  act(() => getProps().setB(1))
  expect(called).toBe(1)
  expect(getProps().a).toBe(true)
  expect(getProps().c).toBe(0)
})

test('maps props using keys', () => {
  let called = 0
  const getProps = testUtil(
    pipe(
      withState('b', 'setB', 0),
      withPropsOnChange(['b'], ({ b }) => {
        called += 1
        return { b }
      })
    ),
    {
      a: true,
    }
  )

  expect(getProps().a).toBe(true)
  expect(getProps().b).toBe(0)
  expect(called).toBe(1)
  act(() => getProps().setB(1))
  expect(called).toBe(2)
  expect(getProps().a).toBe(true)
  expect(getProps().b).toBe(1)
})
