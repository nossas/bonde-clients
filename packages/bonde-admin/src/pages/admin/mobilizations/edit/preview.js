import React from 'react'
import { Mobilization } from '@mobs'
import { PluggableWidget } from '@mobs/ux'
// DRAFT PLUGIN and external dependencies
import { DraftPlugin } from '@mobs/plugins/draft'
// FORM PLUGIN and external dependencies
import { FormPlugin } from '@mobs/plugins/form'
import { FormTellAFriend } from '@/mobilizations/widgets/__plugins__/form/components'
// CONTENT PLUGIN and external dependencies
import { ContentPlugin } from '@mobs/plugins/content'
import { decorator } from '@/components/editor-draft-js/Toolbar'
// PRESSURE PLUGIN and external dependencies
import { PressurePlugin } from '@mobs/plugins/pressure'
import { PressureTellAFriend } from '@/mobilizations/widgets/__plugins__/pressure/components'
// Dependencies more plugins
import AnalyticsEvents from '@/mobilizations/widgets/utils/analytics-events'
import { FinishMessageCustom } from '@/mobilizations/widgets/components'
// TODO: Migrate this plugins
import { Donation } from '@/mobilizations/widgets/__plugins__'
// TODO: Review this concept
import { mobrenderHOC } from '@/mobrender/components/mobilization.connected'
// TODO: Icons should be inside plugin reference.
import { PressureEmailIcon, PressurePhoneIcon } from '@/pages/playground-mobs/icons'


const MyCustonPressurePlugin = (props) => (
  <PressurePlugin
    {...props}
    analyticsEvents={AnalyticsEvents}
    overrides={{
      FinishCustomMessage: { component: FinishMessageCustom },
      FinishDefaultMessage: { component: PressureTellAFriend },
    }}
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
    component: (props) => (
      <FormPlugin
        {...props}
        analyticsEvents={AnalyticsEvents}
        overrides={{
          FinishCustomMessage: { component: FinishMessageCustom },
          FinishDefaultMessage: { component: FormTellAFriend },
        }}
      />
    ),
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
    component: MyCustonPressurePlugin,
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
    component: MyCustonPressurePlugin,
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
    component: (props) => (
      <ContentPlugin
        {...props}
        decorator={decorator}
      />
    ),
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

  render () {
    // Properties received by HOC
    const { blocks, widgets } = this.props
    return (
      <Mobilization
        linkTo={b => `block-${b.id}`}
        blocks={blocks}
        widgets={widgets}
        widgetComponent={PluggableWidget}
        extraWidgetProps={{
          mobilization: this.props.mobilization,
          editable: this.props.editable,
          plugins: plugins
        }}
      />
    )
  }
}

export default mobrenderHOC(MobilizationPreview)
