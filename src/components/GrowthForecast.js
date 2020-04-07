import React from 'react'
import { Box, Heading, Text, Button } from 'rebass/styled-components'
import ChartCard from './ChartCard'

const GrowthForecast = ({ cases }) => {
  const lastWeekCases = cases
    .filter(c => c.growthFactor !== undefined) // ignores empty values
    .slice(cases.length - 8) // last 7 reported days

  const avgGrowthFactor = lastWeekCases.reduce((a, b) => a + b.growthFactor, 0) / lastWeekCases.length

  let healthCheck
  if (avgGrowthFactor >= 1.15) {
    healthCheck = <span style={{ color: 'red' }}>not flattening</span>
  } else if (avgGrowthFactor > 1) {
    healthCheck = <span style={{ color: 'orange' }}>not flattening but growing more slowly</span>
  } else if (avgGrowthFactor > 0.85) {
    healthCheck = <span style={{ color: 'darkgreen' }}>starting to flatten</span>
  } else if (avgGrowthFactor > 0) {
    healthCheck = <span style={{ color: 'green' }}>flattening quickly</span>
  } else {
    healthCheck = <span style={{ color: 'limegreen' }}>flattened</span>
  }
  
  return (
    <Box data-test='growthForecast'>
      <Text color='text'>
        <p>Based on data from the last 7 days...</p>
        <Heading>The curve is {healthCheck}</Heading>
      </Text>

      {/* <ChartCard
          data-test='growthChart'
          data={cases}
          dataKey='growthFactor'
          // sx={totalSx}
          height='15rem'
          icon='virus'
          color='red' /> */}
    </Box>
  )
}

export default GrowthForecast