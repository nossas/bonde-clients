import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { px } from '../../../utils'

const SpacingStyled = styled.div`
  ${props => props.margin && props.margin.top && `margin-top: ${px(props.margin.top)};`}
  ${props => props.margin && props.margin.bottom && `margin-bottom: ${px(props.margin.bottom)};`}
  ${props => props.margin && props.margin.left && `margin-left: ${px(props.margin.left)};`}
  ${props => props.margin && props.margin.right && `margin-right: ${px(props.margin.right)};`}

  ${props => props.padding && props.padding.top && `padding-top: ${px(props.padding.top)};`}
  ${props => props.padding && props.padding.bottom && `padding-bottom: ${px(props.padding.bottom)};`}
  ${props => props.padding && props.padding.left && `padding-left: ${px(props.padding.left)};`}
  ${props => props.padding && props.padding.right && `padding-right: ${px(props.padding.right)};`}
`

/**
 * The only true Spacing component.
 */
const Spacing = ({ margin, padding, ...ownProps }) => {
  const { x: marginX, y: marginY } = margin
  const { x: paddingX, y: paddingY } = padding
  return (
    <SpacingStyled
      {...ownProps}
      margin={{
        top: marginX || margin.top,
        bottom: marginX || margin.bottom,
        left: marginY || margin.left,
        right: marginY || margin.right
      }}
      padding={{
        top: paddingX || padding.top,
        bottom: paddingX || padding.bottom,
        left: paddingY || padding.left,
        right: paddingY || padding.right
      }}
    />
  )
}

// decouple PropTypes only facility design props
const { shape, oneOfType, string, number } = PropTypes

Spacing.propTypes = {
  /** The margin property. */
  margin: shape({
    x: oneOfType([string, number]),
    y: oneOfType([string, number]),
    top: oneOfType([string, number]),
    bottom: oneOfType([string, number]),
    left: oneOfType([string, number]),
    right: oneOfType([string, number])
  }),
  /** The padding property. */
  padding: shape({
    x: oneOfType([string, number]),
    y: oneOfType([string, number]),
    top: oneOfType([string, number]),
    bottom: oneOfType([string, number]),
    left: oneOfType([string, number]),
    right: oneOfType([string, number])
  })
}

Spacing.displayName = 'Spacing'

Spacing.defaultProps = {
  margin: {},
  padding: {}
}

/** @component */
export default Spacing
