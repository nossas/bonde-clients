import React from 'react'
import { Mobilization } from '@mobs'
import { PluggableWidget } from '@mobs/ux'
//Plugins
import { DraftPlugin } from '@mobs/plugins/draft'
import { Content, Donation, Form, Pressure } from '@/mobilizations/widgets/__plugins__'
// TODO: Review this concept
import { mobrenderHOC } from '@/mobrender/components/mobilization.connected'
// TODO: Icons should be inside plugin referente.
import { PressureEmailIcon, PressurePhoneIcon } from '@/pages/playground-mobs/icons'

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

class MobilizationPreview extends React.Component {

  /*constructor (props) {
    super(props)
    this.state = { editable: false, widgets }
  }*/

  /*handleEditWidget (widget) {
    this.setState({
      widgets: this.state.widgets.map(w => w.id === widget.id ? widget : w)
    })
  }

  handleDeleteWidget (widget) {
    this.setState({
      widgets: this.state.widgets.filter(w => w.id !== widget.id)
    })
  }*/

  pluggableWidget () {
    // Properties mobilization received by HOC
    return (props) => (
      <PluggableWidget
        {...props}
        mobilization={this.props.mobilization}
        plugins={plugins}
      />
    )
  }

  render () {
    // Properties received by HOC
    const { blocks, widgets } = this.props
    return (
      <Mobilization
        linkTo={b => `block-${b.id}`}
        blocks={blocks}
        widgets={widgets}
        widgetComponent={this.pluggableWidget()}
      />
    )
  }
}

export default mobrenderHOC(MobilizationPreview)