import React from 'react'
import { mount } from 'enzyme'

export default function(enhancer, propsIn) {
  let propsOut = null

  function Component(props) {
    propsOut = enhancer(props)
    return null
  }

  mount(React.createElement(Component, propsIn))

  return () => propsOut
}
