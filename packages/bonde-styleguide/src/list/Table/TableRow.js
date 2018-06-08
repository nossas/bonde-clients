import styled from 'styled-components'

const Row = styled.div`{
  display: table-row;
  border-bottom: ${props => props.border ? '1px solid #c7c7c726' : 'none'};

}`

Row.displayName = 'Row'

export default Row
