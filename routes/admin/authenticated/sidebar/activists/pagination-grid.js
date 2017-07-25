import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { Link } from 'react-router'
import { Loading } from '~client/components/await'
import {
  ClickableCol,
  CheckboxCol,
  Col,
  Row
} from '~client/components/data-grid/components'
import { DataGridHOC } from '~client/components/data-grid/hocs'
import * as paths from '~client/paths'

const DataGrid = DataGridHOC({ rowComponent: Row })('div')

const HOC = (WrappedComponent) => {
  
  class PP extends React.Component {
    
    constructor (props) {
      super(props)
      this.state = {
        item: null,
        rowIndex: null
      }
    }

    handleClickRow (item, rowIndex) {
      if (this.state.rowIndex === rowIndex) {
        this.setState({ rowIndex: null, item: null })
      } else {
        this.setState({ rowIndex, item })
      }
    } 

    render () {
      const { totalCount } = this.props
      const { item, rowIndex, checked } = this.state

      return (
        <div>
          <WrappedComponent
            {...this.props}
            className={classnames('col col-8')}
            onSelectRow={this.handleClickRow.bind(this)}
            rowIndex={rowIndex}
          />
          {item && (
            <div className='col col-4'>
              <div>
                <h2>Perfil selecionado</h2>
                <button onClick={() => this.handleClickRow(item, rowIndex)}>X</button>
              </div>
              <div>
                <h3>{item.name}</h3>
                
                <label>Email:</label>
                {item.email}
                <br />
                <label>Mobilizações:</label>
                <ul>
                {item.mobilizations && item.mobilizations.map((mob) =>
                  <li>
                    <Link to={paths.editMobilization(mob.id)}>{mob.name}</Link>
                  </li>
                )}
                </ul>
              </div>
            </div>
          )}
        </div>
      )
    }
  }

  return PP
}

const PaginationGrid = ({
  children,
  className,
  loading,
  data,
  totalCount,
  counterText,
  onNextPage,
  onPreviousPage,
  // Injected by SelectableHOC
  rowIndex,
  onSelectRow
}) => (
  <div className={classnames('pagination', className)}>
    <div className='header flex'>
      <div className='flex-auto'>Nome</div>
      <div className='flex-auto'>E-mail</div>
      <div className='flex-auto'>Mobilizações</div>
    </div>
    {loading ? <Loading /> : [
        <DataGrid
          className='grid'
          data={data}
          rowIndex={rowIndex}
          onSelectRow={onSelectRow}
          fieldIndex='id'
        >
          {({ data, rowIndex }) => [
              <Col key={`name-${rowIndex}`}>{data.name}</Col>,
              <Col key={`email-${rowIndex}`}>{data.email}</Col>,
              <Col key={`mob-${rowIndex}`}>
                {data.mobilizations.length}
              </Col>
            ]}
        </DataGrid>,
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
    ]} 
  </div>
)

export default HOC(PaginationGrid)
