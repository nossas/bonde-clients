import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~client/components/layout'
import { Loading } from '~client/components/await'

import { DataGridHOC } from '~client/components/data-grid/hocs'
import { CounterDataGrid, ClickableCol, CheckboxCol, Col, Row } from '~client/components/data-grid/components'

if (require('exenv').canUseDOM) require('./styles.scss')

// move component
const ActivistDetail = ({ item }) => (
  <ul>
    <li>Nome: {item.name}</li>
    <li>E-mail: {item.email}</li>
    <li>Telefone: {item.phone}</li>
  </ul>
)
// end todo

export default class ActivistsContainer extends Component {
  
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

  render () {
    const { children, loading, data, totalCount, onNextPage } = this.props
    
    return (
      <SettingsPageLayout>
        <SettingsPageMenuLayout
          title={
            <FormattedMessage
              id='activists.routes--container.title'
              defaultMessage='Base de usuários'
            />
          }
        />
        <SettingsPageContentLayout>
          {this.state.item && (
            <ActivistDetail item={this.state.item} />
          )}
          {loading ? <Loading /> : [
            <CounterDataGrid
              data={data}
              totalCount={totalCount}
              counterText={
                <FormattedMessage
                  id='activists.routes--container.counter-text'
                  defaultMessage='ativistas'
                />
              }
              fieldIndex='id'
            >
              {({ data, rowIndex }) => [
                <CheckboxCol
                  key={`colIndex-${rowIndex}`}
                  checked={this.state.rowIndexList.indexOf(rowIndex) !== -1}
                  onChange={() => {
                    this.handleSelectRow(data, rowIndex)
                  }}
                />,
                <ClickableCol
                  key={`colName${rowIndex}`}
                  onClick={() => {
                    this.handleClickRow(data, rowIndex)
                  }}
                >
                  {data.name}
                </ClickableCol>,
                <Col key={`colEmail-${rowIndex}`}>{data.email}</Col>
              ]}
            </CounterDataGrid>,
            <button onClick={onNextPage}>Próxima</button>
          ]}
          {children}
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}
