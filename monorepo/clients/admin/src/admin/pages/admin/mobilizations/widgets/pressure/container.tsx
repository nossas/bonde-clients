
import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { SettingsPageContentLayout } from '../../../../../components/layout'
import { SettingsBase } from '../../../../../mobilizations/widgets/__plugins__/pressure/components'
import MobSelectors from '../../../../../mobrender/redux/selectors'
// Pages
import Adjustments from './settings/adjustments'
import Autofire from './settings/autofire'
import Email from './settings/email'
import Finish from './settings/finish'




class WidgetsPressure extends React.Component {
  render() {
    const { match: { path }, mobilization, widget, location } = this.props

    return (
      <SettingsBase mobilization={mobilization} widget={widget} location={location}>
        <SettingsPageContentLayout>
          <Route exact path={`${path}`} component={Adjustments} />
          <Route exact path={`${path}/autofire`} component={Autofire} />
          <Route exact path={`${path}/email`} component={Email} />
          <Route exact path={`${path}/finish`} component={Finish} />
        </SettingsPageContentLayout>
      </SettingsBase>
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

export default connect(mapStateToProperties)(WidgetsPressure)
