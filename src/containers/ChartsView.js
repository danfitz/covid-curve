// Modules
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
// Child components
import ChartCard from '../components/ChartCard'
// UI components
import Wrapper from '../components/UI/Wrapper'
import Hide from '../components/UI/Hide'
import { Flex, Box, Heading, Text, Link, Image } from 'rebass/styled-components'
import theme from '../theme'
// Assets
import ontarioLogo from '../assets/images/ontarioLogo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const positiveSx = {
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
    <Wrapper data-test='chartsView'>
      <header>
        <Flex 
          sx={{
            minHeight: '40vh',
            my: 5,
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}
        >
          <Heading
            as='h1'
            sx={{
              py: [3, 4],
              fontSize: [5, 6],
              borderBottomWidth: [3, 4],
              borderBottomStyle: 'solid',
              borderBottomColor: 'primary',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Image
              src={ontarioLogo}
              width={['8rem', '12rem']}
              ml={['-0.7rem', '-1.1rem']}
              alt='Ontario' />
             COVID-19 Curve
          </Heading>
          <Text
            sx={{
              pt: [3, 4],
              fontSize: 3,
              color: 'unfocusedText'
            }}
          >
            <p>
              Check this site daily to get a live view of how well Ontario is managing to
              {' '}
              <Link
                href='https://twitter.com/hashtag/FlattenTheCurve'
                target='_blank'
              >
                #FlattenTheCurve
              </Link>
            </p>
            <p>
              Data updated every day at 10:30 AM via
              {' '}
              <Link
                href='https://data.ontario.ca/dataset/status-of-covid-19-cases-in-ontario/resource/ed270bb8-340b-41f9-a7c6-e8ef587e6d11'
                target='_blank'
              >
                Ontario's Data API
              </Link>
            </p>
          </Text>
        </Flex>
      </header>

      <main>
        <Flex
          data-test='flexBox'
          flexWrap='wrap'
        >
          <ChartCard
            data-test='positiveChart'
            data={cases}
            dataKey='positive'
            sx={positiveSx}
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
      </main>

      <footer>
        <Flex mt={2} mb={5} flexDirection='column' justifyContent='center' alignItems='center'>
          <Text color='unfocusedText'><p>Made by Dan Fitz</p></Text>
          <Box>
            <Link
              mr={2}
              href='https://github.com/danfitz'
              target='_blank'
            >
              <Hide>GitHub</Hide>
              <FontAwesomeIcon icon={['fab', 'github']} />
            </Link>
            <Link
              href='https://twitter.com/_danfitz'
              target='_blank'
            >
              <Hide>Twitter</Hide>
              <FontAwesomeIcon icon={['fab', 'twitter']} />
            </Link>
          </Box>
        </Flex>
      </footer>
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
