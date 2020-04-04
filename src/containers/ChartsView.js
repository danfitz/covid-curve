// Modules
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// Child components
import ChartCard from '../components/ChartCard'
// UI components
import Wrapper from '../components/UI/Wrapper'
import { Flex } from 'rebass/styled-components'
import theme from '../theme'

const positiveSx = {
  width: '100%',
  p: 3
}

const otherSx = {
  width: ['100%', '100%', '50%'],
  p: 3
}

export const ChartsView = ({ cases }) => {
  return (
    <Wrapper
      data-test='chartsView'
    >
      <Flex
        data-test='flexBox'
        flexWrap='wrap'
      >
        <ChartCard
          data-test='positiveChart'
          data={cases}
          dataKey='positive'
          sx={positiveSx}
          color={theme.colors.primary} />
        <ChartCard
          data-test='resolvedChart'
          data={cases}
          dataKey='resolved'
          sx={otherSx}
          color={theme.colors.secondary} />
        <ChartCard
          data-test='deceasedChart'
          data={cases}
          dataKey='deceased'
          sx={otherSx}
          color={theme.colors.tertiary} />
      </Flex>
    </Wrapper>
  )
}

ChartsView.propTypes = {
  cases: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    positive: PropTypes.number,
    resolved: PropTypes.number,
    deceased: PropTypes.number
  })).isRequired
}

const mapStateToProps = state => ({ cases: state.cases })

const ConnectedChartsView = connect(
  mapStateToProps
)(ChartsView)

export default ConnectedChartsView
