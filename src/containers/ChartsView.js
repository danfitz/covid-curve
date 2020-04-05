// Modules
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// Child components
import ChartCard from '../components/ChartCard'
// UI components
import { Flex } from 'rebass/styled-components'
import theme from '../theme'

const totalSx = {
  width: '100%',
  mt: 4
}

const resolvedSx = {
  width: ['100%', '50%'],
  mt: 4,
  mb: [0, 4],
  pr: [0, 4]
}

const deceasedSx = {
  ...resolvedSx,
  mb: 4,
  pr: 0
}

export const ChartsView = ({ cases }) => {
  return (
    <Flex
      data-test='chartsView'
      flexWrap='wrap'
    >
      <ChartCard
        data-test='totalChart'
        data={cases}
        dataKey='total'
        sx={totalSx}
        height='20rem'
        icon='virus'
        color={theme.colors.primary} />
      <ChartCard
        data-test='resolvedChart'
        data={cases}
        dataKey='resolved'
        sx={resolvedSx}
        height='20rem'
        icon='smile'
        color={theme.colors.secondary} />
      <ChartCard
        data-test='deceasedChart'
        data={cases}
        dataKey='deceased'
        sx={deceasedSx}
        height='20rem'
        icon='hourglass-end'
        color={theme.colors.tertiary} />
    </Flex>
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
