import React from 'react'
import styled from 'styled-components'
import Text from '../Text/Text'

export const Link = styled(() => <Text as='a' />)`
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

export default Link
