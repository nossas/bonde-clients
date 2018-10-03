import styled from 'styled-components'

const Header = styled.div`{
  position: relative;
  ${props => props.minHeight && `min-height: 80px;`}
  background: #000;
  padding: 22px 155px;
}`

Header.displayName = 'Header'

/* @component */
export default Header
