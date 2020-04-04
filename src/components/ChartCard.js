import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis } from 'recharts'
import { Box, Heading, Text } from 'rebass/styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import theme from '../theme'

const ChartCard = ({
  data,
  dataKey,
  height,
  color,
  icon,
  sx
}) => {
  return (
    <Box
      data-test='chartCard'
      height={height}
      sx={sx}
    >
      <Box
        sx={{
          height: '100%',
          position: 'relative',
          bg: 'white',
          borderRadius: 'small',
          boxShadow: 'small'
        }}
      >
        { data.length ? (
          <>
            <Box
              sx={{
                position: 'absolute',
                top: 5,
                left: 5
              }}
            >
              {icon ? (
                <FontAwesomeIcon
                  data-test='icon'
                  style={{
                    display: 'block',
                    color,
                    backgroundColor: `${color}33`,
                    borderRadius: '180%',
                    padding: theme.space[3],
                    width: theme.space[5],
                    height: theme.space[5]
                  }}
                  icon={icon} />
              ) : null}
              <Heading
                fontSize={5}
                mt={3}
              >
                <span data-test='lastValue'>
                  {data[data.length-1][dataKey]}
                </span>
                {' '}
                <Text
                  data-test='dataKeyDisplay'
                  sx={{
                    display: 'block',
                    mt: 2,
                    fontSize: 3,
                    color: 'unfocusedText',
                    fontWeight: 'subheading',
                    textTransform: 'capitalize'
                  }}
                >
                  {dataKey}
                </Text>
              </Heading>
            </Box>

            <ResponsiveContainer width='100%' height='100%'>
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
                <Tooltip
                  cursor={false}
                  separator=''
                  formatter={value => [value, '']}
                  wrapperStyle={{
                    height: '100%'
                  }}
                  contentStyle={{
                    height: '100%',
                    width: '100px',
                    border: 'none',
                    background: 'transparent',
                    boxShadow: theme.shadows.large,
                    borderRadius: theme.radii.small,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between'
                  }}
                  labelStyle={{
                    padding: '0.25rem',
                    textAlign: 'center',
                    fontSize: theme.fontSizes[2],
                  }}
                  itemStyle={{
                    color: theme.colors.text,
                    fontWeight: theme.fontWeights.bold,
                    textAlign: 'center',
                    padding: '1rem 0 0.25rem'
                  }}
                  />
                  <XAxis dataKey='date' hide={true} />
              </AreaChart>
            </ResponsiveContainer>
          </>
        ) : (
          <Text>
            <span data-test='loader'>Loading...</span>
          </Text>
        ) }
      </Box>
    </Box>
  )
}

ChartCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  dataKey: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string,
  sx: PropTypes.object
}


export default ChartCard