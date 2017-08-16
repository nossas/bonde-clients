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
      rowIndexList: [],
      query: '',
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location &&
      nextProps.location.query &&
      nextProps.location.query.q) {
      
      this.setState({ query: nextProps.location.query.q })
    }
  }

  handleClickRow (item, rowIndex) {
    if (this.state.rowIndex === rowIndex) {
      this.setState({ rowIndex: null, item: null })
    } else {
      this.setState({ rowIndex, item })
    }
  }

  onQueryChange (e) {
    this.setState({ query: e.target.value })
  }

  onQuerySubmit (e) {
    e.preventDefault()
    const { communityId, refetch } = this.props
    refetch({ communityId, search: this.state.query })
  }

  render () {
    
    const { totalCount } = this.props

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
          <form onSubmit={this.onQuerySubmit.bind(this)}>
            <input
              type='text'
              name='q'
              onChange={this.onQueryChange.bind(this)}
              value={this.state.query}
            />
            <button type='submit'>Buscar</button>
          </form>
          <h3>{totalCount} ativistas encontrados</h3>
          <div>
            {this.state.item && (
              <ActivistDetail item={this.state.item} />
            )}
            <PaginationGrid {...this.props} />
          </div>
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}
