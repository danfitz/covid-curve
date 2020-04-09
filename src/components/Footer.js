import React from 'react'
import { Flex, Box, Link } from 'rebass/styled-components'
import Hide from './UI/Hide'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Pgh } from './UI/textComponents'

const Footer = () => (
  <footer>
    <Flex mt={2} mb={5} flexDirection='column' justifyContent='center' alignItems='center'>
      <Pgh color='unfocusedText' my={3}>
        Data comes directly from the
        {' '}
        <Link
          href='https://data.ontario.ca/dataset?keywords_en=COVID-19'
          target='_blank'
        >
          official Ontario government
        </Link>
        {' '}
        website
      </Pgh>
      <Pgh color='unfocusedText' mb={3}>
        Dan Fitz © 2020
      </Pgh>
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
)

export default Footer