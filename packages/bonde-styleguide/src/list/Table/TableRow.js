import styled from 'styled-components'

const TableRow = styled.div`{
  display: table-row;
  border-bottom: ${props => props.border ? '1px solid #c7c7c726' : 'none'};

}`

TableRow.displayName = 'TableRow'

export default TableRow
