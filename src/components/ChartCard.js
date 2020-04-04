import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveContainer, AreaChart, Area, Tooltip } from 'recharts'
import { Box, Heading, Text } from 'rebass/styled-components'
import theme from '../theme'

const ChartCard = ({
  data,
  dataKey,
  color,
  sx
}) => {
  if (data.length) {
    return (
      <Box
        data-test='chartCard'
        {...sx}
      >
        <Box
          sx={{
            position: 'relative',
            bg: 'white',
            borderRadius: 'small',
            boxShadow: 'small'
          }}
        >
          <Box sx={{
            position: 'absolute',
            top: '2rem',
            left: '2rem'
          }}>
            <Heading>
              {data[data.length-1][dataKey]}
              <br />
            </Heading>
            <Text>{dataKey}</Text>
          </Box>

          <ResponsiveContainer width='100%' height='100%' minHeight={400}>
            <AreaChart data-test='areaChart' data={data} margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <defs>
                <linearGradient data-test='linearGradient' id={dataKey} x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='0%' stopColor={color} stopOpacity={0.4}/>
                  <stop offset='100%' stopColor={color} stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <Area
                data-test='area'
                type='monotone'
                dataKey={dataKey}
                activeDot={{ stroke: theme.colors.white, strokeWidth: 4, r: 5 }}
                stroke={color}
                strokeWidth={2.5}
                fillOpacity={1}
                fill={`url(#${dataKey})`} />
              <Tooltip />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    )
  } else {
    return (
      <Text>
        <span data-test='loader'>Loading...</span>
      </Text>
    )
  }
}

ChartCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataKey: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  sx: PropTypes.object
}


export default ChartCard