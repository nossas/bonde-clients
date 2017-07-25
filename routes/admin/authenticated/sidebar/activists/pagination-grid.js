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


const SelectableHOC = (WrappedComponent) => {
  
  class PP extends React.Component {
    
    constructor (props) {
      super(props)
      this.state = {
        item: null,
        rowIndex: null,
        rowIndexList: []
      }
    }

    handleClickRow (item, rowIndex) {
      if (this.state.rowIndex === rowIndex) {
        this.setState({ rowIndex: null, item: null })
      } else {
        this.setState({ rowIndex, item })
      }
    }

    handleSelectRow (item, rowIndex) {
      let { rowIndexList } = this.state
      if (rowIndexList.find(i => i === rowIndex) !== undefined) {
        rowIndexList = rowIndexList.filter(x => x !== rowIndex)
      } else {
        rowIndexList = [...this.state.rowIndexList, rowIndex]
      }
      this.setState({ rowIndexList })
    }

    handleMarkAll(e) {
      const { data } = this.props
      let { rowIndexList } = this.state
      
      const selected = data
          .filter(item => rowIndexList.indexOf(item.id) === -1)
          .map(item => item.id)

      if (e.target.checked) {
        rowIndexList = [...this.state.rowIndexList, ...selected]
      } else {
        rowIndexList = rowIndexList.filter(x => selected.indexOf(x) !== -1)
      }
      this.setState({ rowIndexList })
    }

    render () {
      const { totalCount } = this.props
      const { rowIndexList, checked } = this.state

      return (
        <div className='selectable'>
          <h2>
            <input
              type='checkbox'
              value={checked}
              onChange={this.handleMarkAll.bind(this)}
            />
            <span>
              Selecionado {rowIndexList.length} de {totalCount} ativistas
            </span>
          </h2>
          <WrappedComponent
            {...this.props}
            onClickRow={this.handleClickRow.bind(this)}
            onSelectRow={this.handleSelectRow.bind(this)}
            rowIndexList={this.state.rowIndexList}
            rowIndex={this.state.rowIndex}
          />
        </div>
      )
    }
  }

  return PP
}

const CountMobilization = ({ mobilizations }) => (
  <span>{JSON.parse(mobilizations).length}</span>
)

const PaginationGrid = ({
  children,
  loading,
  data,
  totalCount,
  counterText,
  onNextPage,
  onPreviousPage,
  // Injected by SelectableHOC
  rowIndexList,
  onSelectRow
}) => (
  <div className='pagination'> 
    {loading ? <Loading /> : (
      <DataGrid className='grid' data={data} fieldIndex='id'>
        {({ data, rowIndex }) => [
            <Col key={`name-${rowIndex}`}>{data.name}</Col>,
            <Col key={`email-${rowIndex}`}>{data.email}</Col>,
            <Col key={`mob-${rowIndex}`}>
              <CountMobilization mobilizations={data.mobilizations} />
            </Col>
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
