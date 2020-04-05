import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr } from '../utils/testUtils'
import { ChartsView } from './ChartsView'

const defaultProps = {
  cases: [
    { date: 'Mar 23', positive: 1000, resolved: 200, deceased: 50 },
    { date: 'Mar 24', positive: 1100, resolved: 220, deceased: 55 },
    { date: 'Mar 25', positive: 1200, resolved: 240, deceased: 60 }
  ]
}

const setup = (props={}) => {
  const setupProps = { ...defaultProps, ...props }
  const wrapper = shallow(<ChartsView {...setupProps} />)
  return wrapper
}

test('renders without error', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'chartsView')
  expect(component.length).toBe(1)
})

describe('flex box renders with charts', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup()
  })

  test('renders flex box', () => {
    const flexBox = findByTestAttr(wrapper, 'flexBox')
    expect(flexBox.length).toBe(1)
  })

  test('renders positive chart', () => {
    const totalChart = findByTestAttr(wrapper, 'totalChart')
    expect(totalChart.length).toBe(1)
  })

  test('renders resolved chart', () => {
    const resolvedChart = findByTestAttr(wrapper, 'resolvedChart')
    expect(resolvedChart.length).toBe(1)
  })

  test('renders deceased chart', () => {
    const deceasedChart = findByTestAttr(wrapper, 'deceasedChart')
    expect(deceasedChart.length).toBe(1)
  })
})
