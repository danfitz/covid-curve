import React from 'react'
import { Flex, Heading, Text, Image, Link } from 'rebass/styled-components'
import ontarioLogo from '../assets/images/ontarioLogo.png'

const Header = () => (
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
          Data sourced from
          {' '}
          <Link
            href='https://data.ontario.ca/dataset?keywords_en=COVID-19'
            target='_blank'
          >
            Ontario's Data API
          </Link>
          , which is updated every day at 10:30 AM
        </p>
      </Text>
    </Flex>
  </header>
)

export default Header