import styled from 'styled-components'

const Icon = styled.div`
  display: inline-block;
  width: 8px;
  height: 8px;
  position: relative;
  top: -2px;

  &:after {
    content: '';
    position: absolute;
    left: 2px;
    top: -1px;
    width: 3px;
    height: 6px;
    border: solid ${props => props.color};
    border-width: 0 1px 1px 0;
    transform: rotate(45deg);
  }
`

Icon.displayName = 'Icon.Copy'

export default Icon
