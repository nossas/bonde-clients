import styled from 'styled-components'
import Text from '../Text/Text'

export const Link = styled(Text)`
  color: #ee0099!important;
  text-decoration: none;

  &:visited {
    color: #b4006c!important;
    text-decoration: none;
  }

  &:hover {
    text-decoration: underline;
  }
`

Link.displayName = 'Link'

/** @component */
export default Link
