// Modules
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
// Redux
import { connect } from 'react-redux'
import { getCases, setHealthUnit } from '../redux/actions'
// Child components
import ChartCard from '../components/ChartCard'
// UI components
import { Flex, Box } from 'rebass/styled-components'
import { Select, Label } from '@rebass/forms/styled-components'
import Hide from '../components/UI/Hide'
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

export const ChartsView = ({
  getCases,
  setHealthUnit,
  cases,
  healthUnit,
  healthUnits
}) => {
  useEffect(() => {
    getCases()
  }, [getCases, healthUnit])

  return (
    <Box data-test='chartsView'>
      <Hide>
        <Label htmlFor='healthUnits'>Public Health Units</Label>
      </Hide>
      <Select
        data-test='healthUnitSelect'
        id='healthUnits'
        name='healthUnits'
        value={healthUnit}
        onChange={e => setHealthUnit(e.target.value)}
      >
        {healthUnits.map(unit => (
          <option
            key={unit}
            value={unit}
          >  
            {unit === 'All' ? 'All Public Health Units' : unit}
          </option>
        ))}
      </Select>

      <Flex flexWrap='wrap'>
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
    </Box>
  )
}

ChartsView.propTypes = {
  getCases: PropTypes.func.isRequired,
  setHealthUnit: PropTypes.func.isRequired,
  cases: PropTypes.arrayOf(PropTypes.shape({
    date: PropTypes.string.isRequired,
    positive: PropTypes.number,
    resolved: PropTypes.number,
    deceased: PropTypes.number
  })).isRequired,
  healthUnit: PropTypes.string.isRequired,
  healthUnits: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
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
