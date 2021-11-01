
import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'
import { SettingsPageContentLayout, SettingsPageLayout } from "../../../../components/layout"
import { SettingsMenu } from "../../../../mobilizations/components"
import { selectMobilization } from "../../../../mobrender/redux/action-creators"
import MobSelectors from "../../../../mobrender/redux/selectors"
// Pages
import MobilizationsAnalytics from './analytics'
import MobilizationsBasics from './basics'
import MobilizationsCustomDomain from './domain'
import MobilizationsMetrics from './metrics'
import MobilizationsSharing from './sharing'

class MobilizationsSettings extends React.Component {
  componentDidMount() {
    const { match: { params }, hasCurrentMobilization, selectMobilization } = this.props

    !hasCurrentMobilization && selectMobilization(params.mobilization_id)
  }

  render() {
    const { location, mobilization, match: { path } } = this.props
    return (
      <SettingsPageLayout>
        <SettingsMenu location={location} mobilization={mobilization} />
        <SettingsPageContentLayout>
          <Route exact path={`${path}/analytics`} component={MobilizationsAnalytics} />
          <Route exact path={`${path}/basics`} component={MobilizationsBasics} />
          <Route exact path={`${path}/customDomain`} component={MobilizationsCustomDomain} />
          <Route exact path={`${path}/metrics`} component={MobilizationsMetrics} />
          <Route exact path={`${path}/sharing`} component={MobilizationsSharing} />
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

const mapStateToProperties = (state, properties) => {
  const selector = MobSelectors(state, properties)

  return {
    hasCurrentMobilization: selector.hasCurrentMobilization(),
    mobilization: selector.getMobilization() || {}
  }
}

const mapDispatchToProperties = { selectMobilization }

export default connect(mapStateToProperties, mapDispatchToProperties)(MobilizationsSettings)
