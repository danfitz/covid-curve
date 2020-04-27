import React from 'react'
import PropTypes from 'prop-types'
import { ResponsiveContainer, AreaChart, Area, Tooltip, XAxis } from 'recharts'
import { Flex, Box, Heading, Text } from 'rebass/styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import theme from '../theme'
import BeatLoader from 'react-spinners/BeatLoader'

export const percentDiff = (num1, num2) => {
  if (num1 === 0 && num2 === 0) {
    return {
      percentage: `0% today`,
      type: 'down'
    }
  } else if (num2 > num1) {
    const diff = ((num2 / num1) - 1) * 100
    return {
      percentage: `${diff && diff - diff.toFixed(2) !== 0 ? diff.toFixed(2) : diff}% today`,
      type: 'up'
    }
  } else {
    const diff = (1 - (num1 / num2)) * 100
    return {
      percentage: `${diff && diff - diff.toFixed(2) !== 0 ? diff.toFixed(2) : diff}% today`,
      type: 'down'
    }
  }
}

const ChartCard = ({
  data,
  title,
  dataKey,
  height,
  color,
  icon,
  sx,
  displayType='last'
}) => {
  let diff
  if (data.length >= 2) {
    const secondLast = data[data.length-2][dataKey]
    const last = data[data.length-1][dataKey]
    diff = percentDiff(secondLast, last)
  }

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
          boxShadow: 'small',
          overflow: 'hidden'
        }}
      >
        { data.length ? (
          <>
            <Box
              sx={{
                position: 'absolute',
                top: [4, 5],
                left: [4, 5]
              }}
            >
              { icon ? (
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
              ) : null }
              { diff ? (
                <Box
                  data-test='percentDiff'
                  sx={{
                    mt: 4,
                    color: diff.type === 'down' ? 'green' : 'red',
                    display: 'flex',
                    fontSize: 2,
                    fontWeight: 'bold'
                  }}
                >
                  <FontAwesomeIcon icon={`caret-${diff.type}`} />
                  <Text ml={1}>
                    <span data-test='percentDiffValue'>
                      {diff.percentage}
                    </span>
                  </Text>
                </Box>
              ) : null }
              <Heading
                mt={1}
                fontSize={5}
                textAlign='left'
              >
                { displayType === 'last' ? (
                  <span data-test='lastValue'>
                    {data[data.length-1][dataKey]}
                  </span>
                ) : null }
                { displayType === 'average' ? (
                  <span>
                    {(data.reduce((a, b) => a + b[dataKey], 0) / data.length).toFixed(2)}
                  </span>
                ) : null }
                {' '}
                <Text
                  as='span'
                  data-test='dataKeyDisplay'
                  sx={{
                    display: 'block',
                    mt: 2,
                    fontSize: 3,
                    color: 'unfocusedText',
                    fontWeight: 'subheading'
                  }}
                >
                  {title ? title : dataKey}
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
                  cursor={{ stroke: color, strokeWidth: 1 }}
                  separator=''
                  formatter={value => [value, '']}
                  wrapperStyle={{
                    height: '100%'
                  }}
                  contentStyle={{
                    height: '100%',
                    border: 'none',
                    background: 'transparent',
                  }}
                  labelStyle={{
                    padding: '0.25rem',
                    textAlign: 'center',
                    fontSize: theme.fontSizes[2],
                    color
                  }}
                  itemStyle={{
                    color: theme.colors.text,
                    fontWeight: theme.fontWeights.bold,
                    textAlign: 'center',
                    padding: '0.25rem'
                  }}
                  />
                  <XAxis dataKey='date' hide={true} />
              </AreaChart>
            </ResponsiveContainer>
          </>
        ) : (
          <Flex
            justifyContent='center'
            alignItems='center'
            height='100%'
          >
            <BeatLoader data-test='loader' color={color} loading={true} size={20} />
          </Flex>
        ) }
      </Box>
    </Box>
  )
}

ChartCard.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  dataKey: PropTypes.string.isRequired,
  height: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  icon: PropTypes.string,
  sx: PropTypes.object
}


export default ChartCard