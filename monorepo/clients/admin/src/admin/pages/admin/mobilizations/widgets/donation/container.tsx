
import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { SettingsPageContentLayout, SettingsPageLayout } from '../../../../../components/layout'
import { SettingsMenu } from '../../../../../mobilizations/widgets/__plugins__/donation/components'
import MobSelectors from '../../../../../mobrender/redux/selectors'
// Pages
import Adjustments from './settings/adjustments'
import Autofire from './settings/autofire'
import Settings from './settings/donation'
import Finish from './settings/finish'

class WidgetsDonation extends React.Component {
  render() {
    const { match: { path }, mobilization, widget, location } = this.props

    return (
      <SettingsPageLayout>
        <SettingsMenu mobilization={mobilization} widget={widget} location={location} />
        <SettingsPageContentLayout>
          <Route exact path={`${path}`} component={Adjustments} />
          <Route exact path={`${path}/autofire`} component={Autofire} />
          <Route exact path={`${path}/finish`} component={Finish} />
          <Route exact path={`${path}/settings`} component={Settings} />
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

const mapStateToProperties = (state, properties) => {
  const selectors = MobSelectors(state, properties)

  return {
    mobilization: selectors.getMobilization(),
    widget: selectors.getWidget()
  }
}

export default connect(mapStateToProperties)(WidgetsDonation)
