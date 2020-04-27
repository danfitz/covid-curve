// Modules
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
// Redux
import { connect } from 'react-redux'
import { getCases, setHealthUnit } from '../redux/actions'
// Child components
import ChartCard from '../components/ChartCard'
import GrowthForecast from '../components/GrowthForecast'
// UI components
import { Flex } from 'rebass/styled-components'
// Assets
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

const ChartsView = ({
  getCases,
  cases,
  healthUnit
}) => {
  useEffect(() => {
    getCases()
  }, [getCases, healthUnit])

  return (
    <React.Fragment>
      <GrowthForecast />

      <Flex
        as='section'
        flexWrap='wrap'
        alignItems='center'
      >
        <ChartCard
          data={cases}
          title='Total cases'
          dataKey='total'
          sx={totalSx}
          height='20rem'
          icon='virus'
          color={theme.colors.primary} />
        <ChartCard
          data={cases}
          title='Resolved cases'
          dataKey='resolved'
          sx={resolvedSx}
          height='20rem'
          icon='smile'
          color={theme.colors.secondary} />
        <ChartCard
          data={cases}
          title='Deceased cases'
          dataKey='deceased'
          sx={deceasedSx}
          height='20rem'
          icon='hourglass-end'
          color={theme.colors.danger} />
      </Flex>
    </React.Fragment>
  )
}

ChartsView.propTypes = {
  getCases: PropTypes.func.isRequired,
  cases: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    positive: PropTypes.number,
    resolved: PropTypes.number,
    deceased: PropTypes.number
  })).isRequired,
  healthUnit: PropTypes.string.isRequired
}

const mapStateToProps = state => state

const mapDispatchToProps = {
  getCases,
  setHealthUnit
}

const ConnectedChartsView = connect(
  mapStateToProps,
  mapDispatchToProps
)(ChartsView)

export default ConnectedChartsView
