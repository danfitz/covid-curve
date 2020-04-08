import React from 'react'
import { Box } from 'rebass/styled-components'

const Overlay = ({ children, sx, ...props }) => (
  <Box
    {...props}
    sx={{
      zIndex: 'overlay',
      bg: 'rgba(0, 0, 0, 0.1)',
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      ...sx
    }}
  >
    {children}
  </Box>
)

export default Overlay