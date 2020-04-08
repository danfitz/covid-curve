import React from 'react'
import { Box } from 'rebass/styled-components'
import Overlay from './Overlay'
import Wrapper from './Wrapper'

const Modal = ({ active, close, children }) => {
  if (active) {
    return (
      <React.Fragment>
        <Overlay
          onClick={close}
          sx={{ cursor: 'pointer' }} />

        <Box
          sx={{
            position: 'fixed',
            zIndex: 'modal',
            top: '10%',
            left: ['5%', '10%'],
            height: '80%',
            width: ['90%', '80%'],
            overflowY: 'auto',
            bg: 'white',
            borderRadius: 'small',
            boxShadow: 'small'
          }}
        >
          <Wrapper>
            {children}
          </Wrapper>
        </Box>
      </React.Fragment>
    )
  } else {
    return null
  }
}

export default Modal