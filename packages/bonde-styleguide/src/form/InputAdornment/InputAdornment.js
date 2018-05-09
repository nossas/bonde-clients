import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

//
// TODO: Make component accepts the content like icons as a children.
//
const InputAdornment = styled(({ className, invalid }) => (
  <div className={className}>
    {invalid ? '!' : ''}
  </div>
))`
  font-family: 'Nunito Sans', sans-serif;
  font-size: 13px;
  border-bottom: 1px solid;
  display: flex;
  align-items: center;
  padding: 0 24px;
  position: relative;

  ${props => props.invalid && `{
    color: #FF2B4E;
    border-bottom-color: #FF2B4E;
  }`}

  ${props => props.valid && `{
    border-bottom-color: #50E3C2;

    &:after {
      content: '';
      width: 3px;
      height: 6px;
      border: solid #50E3C2;
      border-width: 0 1px 1px 0;
      transform: rotate(45deg);
    }
  }`}
`

InputAdornment.propTypes = {
  /** Show an invalid input adornment. */
  invalid: PropTypes.bool,
  /** Show a valid input adornment. */
  valid: PropTypes.bool
}

/* @component */
export default InputAdornment
