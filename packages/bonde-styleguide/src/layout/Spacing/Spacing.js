import PropTypes from 'prop-types'
import styled from 'styled-components'
import { borderSpacing, borderSpacingPropTypes } from '../../utils'

/**
 * The only true Spacing component.
 */
const Spacing = styled.div`
  ${({ margin }) => margin && borderSpacing('margin', margin)}
  ${({ padding }) => padding && borderSpacing('padding', padding)}
`

const { string } = PropTypes

Spacing.propTypes = {
  /** The margin property. */
  margin: string,
  /** The padding property. */
  padding: string
}

Spacing.displayName = 'Spacing'

/* @component */
export default Spacing
