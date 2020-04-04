import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr } from '../utils/testUtils'
import ChartCard from './ChartCard'

const defaultProps = {
  data: [{ date: 'Mar 23', positive: 1, resolved: 1, deceased: 1 }],
  dataKey: 'positive',
  height: '20rem',
  color: 'purple'
}

const setup = (props={}) => {
  const setupProps = { ...defaultProps, ...props }
  const wrapper = shallow(<ChartCard {...setupProps} />)
  return wrapper
}

test('renders without error', () => {
  const wrapper = setup()
  const component = findByTestAttr(wrapper, 'chartCard')
  expect(component.length).toBe(1)
})

test('renders loader if data is empty', () => {
  const wrapper = setup({ data: [] })
  const loader = findByTestAttr(wrapper, 'loader')
  expect(loader.length).toBe(1)
})

test('data prop gets passed to AreaChart as data prop', () => {
  const { data } = defaultProps
  const wrapper = setup({ data })

  const areaChart = findByTestAttr(wrapper, 'areaChart')
  expect(areaChart.props().data).toBe(data)
})

test('dataKey prop gets passed to Area as prop', () => {
  const dataKey = 'negative'
  const wrapper = setup({ dataKey })

  const area = findByTestAttr(wrapper, 'area')
  expect(area.props().dataKey).toBe(dataKey)
})

test('color prop gets passed to Area as stroke prop', () => {
  const color = 'green'
  const wrapper = setup({ color })

  const area = findByTestAttr(wrapper, 'area')
  expect(area.props().stroke).toBe(color)
})

test('color props gets passed to stops in linearGradient as stopColor', () => {
  const color = 'yellow'
  const wrapper = setup({ color })

  const linearGradient = findByTestAttr(wrapper, 'linearGradient')
  linearGradient.children().forEach(child => {
    expect(child.props().stopColor).toBe(color)
  })
})