import styled from 'styled-components'

/**
 * The row component of `DataList`.
 */
const DataListRow = styled.div`
  display: table-row;
  border-bottom: 1px solid #efefef;

  &:last-child {
    border: none;
  }
`

DataListRow.displayName = 'DataListRow'

/** @component */
export default DataListRow
