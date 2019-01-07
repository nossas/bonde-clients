import React from 'react'
import { Mobilization } from '@mobs'
import { EditBlockWrapper, NewBlockButton, PluggableWidget } from '@mobs/ux'
//Plugins
import { DraftPlugin } from '@mobs/plugins/draft'
import { Content, Donation, Form, Pressure } from '@/mobilizations/widgets/__plugins__'
// Datasets e assets
import { blocks, widgets } from './dataset'
import { PressureEmailIcon, PressurePhoneIcon } from './icons'

const CustomNewBlockButton = () => (
  <NewBlockButton
    onClick={() => console.log('Clicked on new block button!')}
  />
)

const plugins = [
  { 
    kind: 'draft',
    component: DraftPlugin,
    options: { noOverlay: true }
  },
  {
    kind: 'form',
    component: Form,
    options: DraftPlugin.setOptions({
      label: 'Formulário',
      icon: () => (<i className='fa fa-list block white' />),
      action: (widget) => {
        console.log(`update widget ${widget.id}`)
      }
    })
  },
  {
    kind: 'donation',
    component: Donation,
    options: DraftPlugin.setOptions({
      label: 'Doação',
      icon: () => (<i className='fa fa-money block white' />),
      action: (widget) => {
        console.log(`update widget ${widget.id}`)
      }
    })
  },
  {
    kind: 'pressure',
    component: Pressure,
    options: DraftPlugin.setOptions({
      label: 'Pressão por e-mail',
      icon: PressureEmailIcon,
      action: (widget) => {
        console.log(`update widget ${widget.id}`)
      }
    })
  },
  {
    kind: 'pressure-phone',
    component: Pressure,
    options: DraftPlugin.setOptions({
      label: 'Pressão por telefone',
      icon: PressurePhoneIcon,
      action: (widget) => {
        console.log(`update widget ${widget.id}`)
      }
    })
  },
  {
    kind: 'content',
    component: Content,
    options: Object.assign(
      {},
      DraftPlugin.setOptions({
        label: 'Texto',
        icon: () => (<i className='fa fa-font block white' />),
        action: (widget) => {
          console.log(`update widget ${widget.id}`)
        }
      }),
      { noOverlay: true }
    )
  }
]

export default class extends React.Component {

  constructor (props) {
    super(props)
    this.state = { editable: true, widgets }
  }

  handleEditWidget (widget) {
    this.setState({
      widgets: this.state.widgets.map(w => w.id === widget.id ? widget : w)
    })
  }

  handleDeleteWidget (widget) {
    this.setState({
      widgets: this.state.widgets.filter(w => w.id !== widget.id)
    })
  }

  pluggableWidget () {
    return (props) => (
      <PluggableWidget
        {...props}
        editable={this.state.editable}
        plugins={plugins}
        onEdit={this.handleEditWidget.bind(this)}
        onDelete={this.handleDeleteWidget.bind(this)}
      />
    )
  }

  render () {
    return (
      <Mobilization
        editable={this.state.editable}
        newBlockButton={CustomNewBlockButton}
        linkTo={b => `block-${b.id}`}
        blocks={blocks}
        blockWrapper={this.state.editable ? EditBlockWrapper : undefined}
        widgets={this.state.widgets}
        widgetComponent={this.pluggableWidget()}
      />
    )
  }
}