import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~client/components/layout'

import PaginationGrid from './pagination-grid'

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
          <PaginationGrid
            {...this.props}
            rowIndexList={this.state.rowIndexList}
            onSelectRow={this.handleSelectRow.bind(this)}
          />
          {`${this.state.rowIndexList.length} ativistas selecionados`}
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}
