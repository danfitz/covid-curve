import React from 'react'
import { Box } from 'rebass/styled-components'

const Wrapper = ({ children, ...props }) => (
  <Box
    width={[2, 1]}
    maxWidth='64rem'
    margin='0 auto'
    {...props}
  >
    {children}
  </Box>
)

export default Wrapper