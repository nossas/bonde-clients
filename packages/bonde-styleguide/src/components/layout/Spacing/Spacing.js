import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * The only true Spacing component.
 */
const Spacing = styled.div`
  ${props => props.margin && props.margin.top && `top: ${props.margin.top};`}
  ${props => props.margin && props.margin.bottom && `bottom: ${props.margin.bottom};`}
  ${props => props.margin && props.margin.left && `left: ${props.margin.left};`}
  ${props => props.margin && props.margin.right && `right: ${props.margin.right};`}

  ${props => props.padding && props.padding.top && `top: ${props.padding.top};`}
  ${props => props.padding && props.padding.bottom && `bottom: ${props.padding.bottom};`}
  ${props => props.padding && props.padding.left && `left: ${props.padding.left};`}
  ${props => props.padding && props.padding.right && `right: ${props.padding.right};`}
`

// decouple PropTypes only facility design props
const { shape, oneOfType, string, number } = PropTypes


Spacing.propTypes = {
  /** The margin property. */
  margin: shape({
    top: oneOfType([string, number]),
    bottom: oneOfType([string, number]),
    left: oneOfType([string, number]),
    right: oneOfType([string, number])
  }),
  /** The padding property. */
  padding: shape({
    top: oneOfType([string, number]),
    bottom: oneOfType([string, number]),
    left: oneOfType([string, number]),
    right: oneOfType([string, number])
  })
}

Spacing.displayName = 'Spacing'

/** @component */
export default Spacing
