import React from 'react'
import ReactGA from 'react-ga'
import { Mobilization } from '@mobs'
import { PluggableWidget } from '@mobs/ux'
// DRAFT PLUGIN and external dependencies
import { DraftPlugin } from '@mobs/plugins/draft'
// FORM PLUGIN and external dependencies
import { FormPlugin, FormAnalytics } from '@mobs/plugins/form'
import { FormTellAFriend } from '@/mobilizations/widgets/__plugins__/form/components'
// CONTENT PLUGIN and external dependencies
import { ContentPlugin } from '@mobs/plugins/content'
import { decorator } from '@/components/editor-draft-js/Toolbar'
// PRESSURE PLUGIN and external dependencies
import { PressurePlugin, PressureAnalytics } from '@mobs/plugins/pressure'
import { PressureTellAFriend } from '@/mobilizations/widgets/__plugins__/pressure/components'
import { client as graphqlClient } from '@/store'
// PRESSURE PLUGIN and external dependencies
import { DonationPlugin, DonationAnalytics } from '@mobs/plugins/donation'
import { DonationTellAFriend } from '@/mobilizations/widgets/__plugins__/donation/components'
// Dependencies more plugins
import { FinishMessageCustom } from '@/mobilizations/widgets/components'
// TODO: Review this concept
import { mobrenderHOC } from '@/mobrender/components/mobilization.connected'
// TODO: Icons should be inside plugin reference.
import { PressureEmailIcon, PressurePhoneIcon } from '@/pages/playground-mobs/icons'


const MyCustonPressurePlugin = (props) => (
  <PressurePlugin
    {...props}
    analyticsEvents={PressureAnalytics}
    graphqlClient={graphqlClient}
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
        analyticsEvents={FormAnalytics}
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
    component: (props) => (
      <DonationPlugin
        {...props}
        analyticsEvents={DonationAnalytics}
        overrides={{
          FinishCustomMessage: { component: FinishMessageCustom },
          FinishDefaultMessage: { component: DonationTellAFriend },
        }}
      />
    ),
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

  componentDidMount () {
    const isTest = false
    if (!isTest && this.props.mobilization) {
      const { mobilization } = this.props

      ReactGA.initialize('UA-26278513-30')
      ReactGA.pageview('/' + mobilization.slug)

      if (mobilization.google_analytics_code) {
        ReactGA.initialize(
          mobilization.google_analytics_code,
          { gaOptions: { name: 'MobilizationTracker' } }
        )
        ReactGA.ga('MobilizationTracker.send', 'pageview', '/')
      }
    }
  }

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
