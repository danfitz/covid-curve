import React from 'react'
import { GrowthForecast } from './GrowthForecast'
import { shallow } from 'enzyme'
import { findByTestAttr } from '../utils/testUtils'

const defaultProps = {
  cases: [
    { date: 'Mar 23', growthFactor: 1.1 },
    { date: 'Mar 24', growthFactor: 1.09 }
  ]
}

const setup = (props={}) => {
  const setupProps = { ...defaultProps, ...props }
  const wrapper = shallow(<GrowthForecast {...setupProps} />)
  return wrapper
}

test('renders without error', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'growthForecast')
  expect(component.length).toBe(1)
})