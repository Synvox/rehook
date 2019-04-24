// @ts-check
import { useMemo, useRef, useEffect } from 'react'

function usePrevious(value) {
  const ref = useRef(null)

  useEffect(() => {
    ref.current = value
  })

  return ref.current
}

/**
 *
 * @param {any} shouldMapOrKeys
 * @param {Function} createProps
 * @returns {Object}
 */
const withPropsOnChange = (shouldMapOrKeys, createProps) => (props = {}) => {
  const previousProps = usePrevious(props)

  const keys = Array.isArray(shouldMapOrKeys)
    ? shouldMapOrKeys.map(key => props[key])
    : shouldMapOrKeys(props, previousProps)
      ? undefined
      : []

  const mappedProps = useMemo(() => createProps(props), keys)

  return {
    ...props,
    ...mappedProps,
  }
}

export default withPropsOnChange
