import styled from 'styled-components'
import { borderSpacing, borderSpacingPropTypes } from '../../../utils'

/**
 * The only true Spacing component.
 */
const Spacing = styled.div`
  ${({ margin }) => margin && borderSpacing('margin', margin)}
  ${({ padding }) => padding && borderSpacing('padding', padding)}
`

Spacing.propTypes = {
  /** The margin property. */
  margin: borderSpacingPropTypes,
  /** The padding property. */
  padding: borderSpacingPropTypes
}

Spacing.displayName = 'Spacing'

/* @component */
export default Spacing
