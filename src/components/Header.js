import React from 'react'
import { Flex, Heading, Image, Link } from 'rebass/styled-components'
import ontarioLogo from '../assets/images/ontarioLogo.png'
import Hide from './UI/Hide'
import { Pgh } from './UI/textComponents'

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
          my: 0,
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
          alt='' />
          <Hide>Ontario</Hide> COVID-19 Curve
      </Heading>
      <Pgh
        sx={{
          pt: [3, 4],
          fontSize: 3,
          color: 'unfocusedText'
        }}
      >
        Data updated every day at around 10:30 AM EST. Sourced from
        {' '}
        <Link
          href='https://data.ontario.ca/dataset?keywords_en=COVID-19'
          target='_blank'
        >
          Ontario's Data API
        </Link>
        .
      </Pgh>
    </Flex>
  </header>
)

export default Header