import React from 'react'
import PropTypes from 'prop-types'
import { default as ReactSelect } from 'react-select'
import theme from '../../theme'

const renderControl = (styles, state) => ({
  ...styles,
  background: 'transparent',
  border: `0.05rem solid ${theme.colors.primary}`,
  boxShadow: state.isFocused ? `0 0 0 0.05rem ${theme.colors.primary}` : 0,
  '&:hover': {
    borderColor: theme.colors.primary
  }
})

const renderSingleValue = styles => ({
  ...styles,
  color: theme.colors.primary,
  margin: '0 auto'
})

const renderValueContainer = styles => ({
  ...styles,
  justifyContent: 'center'
})

const renderOption = (styles, state) => ({
  ...styles,
  color: theme.colors.text,
  background: state.isSelected ? theme.colors.primaryFaded : 'transparent',
  fontWeight: state.isSelected ? theme.fontWeights.bold : theme.fontWeights.body
})

const renderDropdown = styles => ({
  ...styles,
  borderLeft: ` 0.05rem solid ${theme.colors.primary}`,
  color: theme.colors.primary,
  '&:hover': {
    color: theme.colors.primary
  }
})

const renderInput = styles => ({
  ...styles,
  color: theme.colors.primary
})

const Select = ({ styles, ...props }) => (
  <ReactSelect
    styles={{
      control: renderControl,
      option: renderOption,
      singleValue: renderSingleValue,
      valueContainer: renderValueContainer,
      dropdownIndicator: renderDropdown,
      input: renderInput,
      ...styles
    }}
    {...props} />
)

Select.propTypes = {
  styles: PropTypes.object,
  props: PropTypes.object.isRequired
}

Select.defaultProps = {
  styles: {}
}

export default Select