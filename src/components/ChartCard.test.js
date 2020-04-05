import React from 'react'
import { shallow } from 'enzyme'
import { findByTestAttr } from '../utils/testUtils'
import ChartCard, { percentDiff } from './ChartCard'

const defaultProps = {
  data: [{ date: 'Mar 23', positive: 1, resolved: 1, deceased: 1 }],
  dataKey: 'positive',
  height: '20rem',
  color: 'purple',
  icon: 'smile'
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

describe('Props passed to child components correctly', () => {
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
})

describe('Chart description', () => {
  test('icon renders if icon prop provided', () => {
    const icon = 'smile'
    const wrapper = setup({ icon })

    const iconComponent = findByTestAttr(wrapper, 'icon')
    expect(iconComponent.length).toBe(1)
  })

  test('icon does NOT render if icon prop not provided', () => {
    const icon = undefined
    const wrapper = setup({ icon })

    const iconComponent = findByTestAttr(wrapper, 'icon')
    expect(iconComponent.length).toBe(0)
  })

  test('displays value of dataKey property @ last object in data array', () => {
    const data = [
      { date: 'Mar 23', myKey: 500 },
      { date: 'Mar 24', myKey: 10000 }
    ]
    const dataKey = 'myKey'
    const wrapper = setup({ data, dataKey })

    const lastValue = findByTestAttr(wrapper, 'lastValue')
    const lastObject = data[data.length-1]
    expect(lastValue.text()).toBe(lastObject[dataKey].toString())
  })

  test('displays dataKey itself', () => {
    const dataKey = 'I am a test!'
    const wrapper = setup({ dataKey })

    const dataKeyDisplay = findByTestAttr(wrapper, 'dataKeyDisplay')
    expect(dataKeyDisplay.text()).toBe(dataKey)
  })
})

describe('Percentage difference', () => {
  test('percentage does NOT display if data.length < 2', () => {
    const data = [{ date: 'Mar 23', positive: 500 }]
    const wrapper = setup({ data })

    const percentDiff = findByTestAttr(wrapper, 'percentDiff')
    expect(percentDiff.length).toBe(0)
  })

  test('percentage DOES display if data.length >= 2', () => {
    const data = [
      { date: 'Mar 23', positive: 500 },
      { date: 'Mar 23', positive: 500 }
    ]
    const wrapper = setup({ data })

    const percentDiff = findByTestAttr(wrapper, 'percentDiff')
    expect(percentDiff.length).toBe(1)
  })

  test('displays percentage difference using returned value from percentDiff function', () => {
    const data = [
      { date: 'Mar 23', positive: 500 },
      { date: 'Mar 23', positive: 600 }
    ]
    const dataKey = 'positive'
    const wrapper = setup({ data, dataKey })

    const diff = percentDiff(data[0][dataKey], data[1][dataKey])
    const percentDiffValue = findByTestAttr(wrapper, 'percentDiffValue')
    expect(percentDiffValue.text()).toBe(diff.percentage)
  })
})