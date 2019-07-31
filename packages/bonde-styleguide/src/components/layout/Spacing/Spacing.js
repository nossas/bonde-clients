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

Spacing.propTypes = {
  /** The margin property. */
  margin: PropTypes.shape({
    top: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
  }),
  /** The padding property. */
  padding: PropTypes.shape({
    top: PropTypes.string,
    bottom: PropTypes.string,
    left: PropTypes.string,
    right: PropTypes.string,
  })
}

Spacing.displayName = 'Spacing'

/** @component */
export default Spacing
