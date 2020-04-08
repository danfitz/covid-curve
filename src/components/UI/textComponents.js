import React from 'react'
import { Text } from 'rebass/styled-components'

export const Pgh = ({ children, sx, ...props }) => (
  <Text
    as='p'
    variant='text'
    sx={sx}
    {...props}
  >
    {children}
  </Text>
)