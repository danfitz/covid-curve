// Modules
import React from 'react'
import { connect } from 'react-redux'
// Child components
import ChartCard from '../components/ChartCard'
// UI components
import { Flex, Box } from 'rebass'
import theme from '../theme'

export const ChartsView = ({ cases }) => {
  return (
    <Box
      data-test='chartsView'
      mx={[4, 5, 6]}
    >
      <Flex
        data-test='flexBox'
        flexWrap='wrap'
      >
        <ChartCard
          data-test='positiveChart'
          data={cases}
          dataKey='positive'
          sx={{
            width: 1,
            p: 3,
          }}
          color={theme.colors.primary} />
        <ChartCard
          data-test='resolvedChart'
          data={cases}
          dataKey='resolved'
          sx={{
            width: [1, 1, 1/2],
            p: 3,
          }}
          color={theme.colors.secondary} />
        <ChartCard
          data-test='deceasedChart'
          data={cases}
          dataKey='deceased'
          sx={{
            width: [1, 1, 1/2],
            p: 3,
          }}
          color={theme.colors.tertiary} />
      </Flex>
    </Box>
  )
}

const mapStateToProps = state => ({ cases: state.cases })

const ConnectedChartsView = connect(
  mapStateToProps
)(ChartsView)

export default ConnectedChartsView
