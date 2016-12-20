import React, { PropTypes } from 'react'
import ReactGA from 'react-ga'

import { Mobilization } from '../../modules/mobilizations/components'


export default class ShowMobilization extends React.Component {
  static propTypes = {
    mobilization: PropTypes.object.isRequired,
    blocks: PropTypes.object.isRequired,
    widgets: PropTypes.object.isRequired
  }

  componentDidMount() {
    let mob = this.props.mobilization

    ReactGA.initialize('UA-26278513-30')
    ReactGA.pageview('/' + mob.slug)

    if (mob.google_analytics_code) {
      ReactGA.initialize(
        mob.google_analytics_code,
        { gaOptions: { name: 'MobilizationTracker' } }
      )
      ReactGA.ga('MobilizationTracker.send', 'pageview', '/')
    }
  }

  render() {
    const { blocks, widgets } = this.props

    return <Mobilization {...this.props} blocks={blocks.data} widgets={widgets.data}  editable={false} />
  }
}
