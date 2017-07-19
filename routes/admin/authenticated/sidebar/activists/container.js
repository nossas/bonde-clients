import React, { Component } from 'react'
import { FormattedMessage } from 'react-intl'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~client/components/layout'
import { Listable, Row, ColumnHOC } from '~client/components/listable'

if (require('exenv').canUseDOM) require('./styles.scss')

// TODO: move components
const ActivistListable = (props) => {
  
  const Col = ColumnHOC({ defaultClassName: 'col-activist' })

  const RowComponent = rowProps => (
    <Row className='row-activist' {...rowProps}>
      {({ item }) => [
        <Col size={4} smSize={12} value={item.name} />,
        <Col size={4} smSize={12} value={item.email} />,
        <Col size={4} smSize={12} value={item.phone} />
      ]}
    </Row>
  )

  return <Listable {...props} rowComponent={RowComponent} />
}

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
    this.state = { rowIndex: null, item: null }
  }

  handleClickRow (item, rowIndex) {
    this.setState({ rowIndex, item })
  }

  render () {
    const { children, data } = this.props
    
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
          <ActivistListable
            data={data}
            selectedRowIndex={this.state.rowIndex}
            onClickRow={this.handleClickRow.bind(this)}
          />
          {this.state.item && (
            <ActivistDetail item={this.state.item} />
          )}
            
          {children}
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}
