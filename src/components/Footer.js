import React from 'react'
import { Flex, Box, Text, Link } from 'rebass/styled-components'
import Hide from './UI/Hide'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => (
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
)

export default Footer