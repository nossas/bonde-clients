import PropTypes from 'prop-types'
import styled from 'styled-components'

/**
 * The only true flexbox container.
 */
const Flexbox = styled.div`
  display: flex;

  ${props => props.horizontal && `
    width: 100%;
    flex-direction: row;
  `}
  ${props => props.vertical && `
    width: 100%;
    height: 100%;
    flex-direction: column;
  `}

  ${props => props.middle && `
    align-items: center;
    justify-content: center;
  `}

  ${props => props.end && `
    align-items: end;
    justify-content: flex-end;
  `}

  ${props => props.justify && `
    justify-content: ${props.justify};
  `}

  ${props => props.spacing && `
    justify-content: space-${props.spacing}
  `}

  ${props => props.colSize && `
    & > * {
      width: ${props.colSize};
    }
  `}

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

Flexbox.propTypes = {
  horizontal: PropTypes.bool,
  vertical: PropTypes.bool,
  middle: PropTypes.bool,
  end: PropTypes.bool,
  spacing: PropTypes.oneOf(['around', 'between']),
  colSize: PropTypes.string,
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

Flexbox.defaultProps = {
  margin: {},
  padding: {},
}

Flexbox.displayName = 'Flexbox2'

/** @component */
export default Flexbox
