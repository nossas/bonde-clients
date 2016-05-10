import React from 'react'
import * as Paths from '../Paths'
import { FormWidgetMenu, DonationWidgetMenu, Loading, CloseButton } from './../components'

export default class AutoFireForm extends React.Component {
  constructor (props, context) {
    super(props, context)
    this.state = {
      loading: false,
      hasNewField: false
    }
  }

  widget (props = this.props) {
    const { widgets } = props
    return widgets.data[widgets.data.map((widget) => { return widget.id.toString() }).indexOf(this.props.params.widget_id)]
  }

  renderPage () {
    const { widgets, dirty } = this.props
    const widget = this.widget()
    return (
      <div className='flex-auto flex flex-column bg-silver gray relative'>
        {(widget.kind === 'donation'
          ? <DonationWidgetMenu {...this.props} widget={widget} />
          : <FormWidgetMenu {...this.props} widget={widget} />
        )}
        <div className='p3 flex-auto overflow-scroll'>

        </div>
        <CloseButton dirty={dirty} path={Paths.editMobilization(this.props.mobilization.id)} />
      </div>
    )
  }

  renderLoading () {
    return (
      <Loading />
    )
  }

  render () {
    return (this.props.widgets.data.length > 0 ? this.renderPage() : this.renderLoading())
  }
}
