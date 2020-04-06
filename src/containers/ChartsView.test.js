import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr } from '../utils/testUtils'
import { ChartsView } from './ChartsView'
import { setHealthUnit, getCases } from '../redux/actions'

const defaultProps = {
  cases: [
    { date: 'Mar 23', total: 1250, positive: 1000, resolved: 200, deceased: 50 },
    { date: 'Mar 24', total: 1375, positive: 1100, resolved: 220, deceased: 55 },
    { date: 'Mar 25', total: 1500, positive: 1200, resolved: 240, deceased: 60 }
  ],
  healthUnit: 'All',
  healthUnits: ['All', 'Peel Public Health', 'Toronto Public Health'],
  setHealthUnit,
  getCases
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

describe('Displays ChartCard components', () => {
  let wrapper
  beforeEach(() => {
    wrapper = setup()
  })

  test('renders total chart', () => {
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

describe('Select box for choosing health units', () => {
  let wrapper
  beforeEach(() => wrapper = setup())
  
  test('renders without error', () => {
    const healthUnitSelect = findByTestAttr(wrapper, 'healthUnitSelect')
    expect(healthUnitSelect.length).toBe(1)
  })

  test('all health units option selected by default', () => {
    const { healthUnit } = defaultProps

    const healthUnitSelect = findByTestAttr(wrapper, 'healthUnitSelect')
    expect(healthUnitSelect.prop('value')).toBe(healthUnit)
  })

  test('selecting new health unit changes value', () => {
    const healthUnit = 'Peel Public Health'
    wrapper = setup({ healthUnit })
    
    const healthUnitSelect = findByTestAttr(wrapper, 'healthUnitSelect')
    healthUnitSelect.simulate('change', { target: { value: healthUnit }})
    expect(healthUnitSelect.prop('value')).toBe(healthUnit)
  })

  // ! NOT SURE how to implement this test yet...
  // test('selecting new health unit updates cases', () => {
  //   const cases = []
  //   const healthUnit = 'All'
  //   wrapper = setup({ cases, healthUnit  })

  //   const newUnit = 'Peel Public Health'
  //   const healthUnitSelect = findByTestAttr(wrapper, 'healthUnitSelect')
  //   healthUnitSelect.simulate('change', { target: { value: newUnit  }})

  //   const totalChart = findByTestAttr(wrapper, 'totalChart')
  //   expect(totalChart.prop('data')).toBe(cases)
  // })
})