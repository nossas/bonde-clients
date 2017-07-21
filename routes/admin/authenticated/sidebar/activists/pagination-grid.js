import React from 'react'
import PropTypes from 'prop-types'
import { Loading } from '~client/components/await'
import {
  ClickableCol,
  CheckboxCol,
  Col,
  Row
} from '~client/components/data-grid/components'
import { DataGridHOC } from '~client/components/data-grid/hocs'

const DataGrid = DataGridHOC({ rowComponent: Row })('div')

const PaginationGrid = ({
  children,
  loading,
  data,
  totalCount,
  counterText,
  onNextPage,
  onPreviousPage,
  // TODO: Checar se não deve ir para o reducer esse comportamento
  rowIndexList,
  onSelectRow
}) => (
  <div className='pagination'>
    <h2>{totalCount} ativistas</h2>
    {loading ? <Loading /> : (
      <DataGrid className='grid' data={data} fieldIndex='id'>
        {({ data, rowIndex }) => [
          <CheckboxCol
            checked={rowIndexList.indexOf(rowIndex) !== -1}
            onChange={() => onSelectRow(data, rowIndex)}
          />,
          <Col key={`name-${rowIndex}`}>{data.name}</Col>,
          <Col key={`email-${rowIndex}`}>{data.email}</Col>
        ]}
      </DataGrid>
    )}
    <div className='flex'>
      <button
        className='btn bg-gray rounded m2 flex-auto'
        onClick={onPreviousPage}
      >
        Anterior
      </button>
      <button
        className='btn bg-gray rounded m2 flex-auto'
        onClick={onNextPage}
      >
        Próximo
      </button>
    </div>
  </div>
)

export default PaginationGrid
