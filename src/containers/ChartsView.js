// Modules
import React from 'react'
import { connect } from 'react-redux'
// Child components
import ChartCard from '../components/ChartCard'
// UI components
import { Flex, Box } from 'rebass'
import theme from '../theme'

const ChartsView = ({ cases }) => {
  return (
    <Box mx={[4, 5, 6]}>
      <Flex flexWrap='wrap'>
        <ChartCard
          data={cases}
          dataKey='positive'
          sx={{
            width: [1, 1, 1/3],
            p: 3,
          }}
          color={theme.colors.primary} />
        <ChartCard
          data={cases}
          dataKey='resolved'
          sx={{
            width: [1, 1, 1/3],
            p: 3,
          }}
          color={theme.colors.secondary} />
        <ChartCard
          data={cases}
          dataKey='deceased'
          sx={{
            width: [1, 1, 1/3],
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
