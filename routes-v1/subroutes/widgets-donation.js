import React from 'react'
import { connect } from 'react-redux'
import { Route } from 'react-router-dom'

import MobSelectors from '~client/mobrender/redux/selectors'
import { Loading } from '~client/components/await'
import { selectMobilization, asyncFetchWidgets, asyncUpdateWidget } from '~client/mobrender/redux/action-creators'
import { SettingsPageLayout, SettingsPageContentLayout } from '~client/components/layout'
import { SettingsMenu } from '~client/mobilizations/widgets/__plugins__/donation/components'

// Pages
import Adjustments from '~routes/admin/authenticated/sidebar/widgets-donation-settings/adjustments/page.connected'
import Autofire from '~routes/admin/authenticated/sidebar/widgets-donation-settings/autofire/page.connected'
import Finish from '~routes/admin/authenticated/sidebar/widgets-donation-settings/finish/page'
import Settings from '~routes/admin/authenticated/sidebar/widgets-donation-settings/donation/page.connected'

const injectProps = (Component, props) => routeProps => <Component {...props} {...routeProps} />

class WidgetsDonation extends React.Component {
  componentDidMount () {
    const { match: { params } } = this.props
    !this.props.mobilization && this.props.selectMobilization(params.mobilization_id)
    !this.props.widgetsIsLoaded && this.props.asyncFetchWidgets(params.mobilization_id)
  }

  render () {
    const { match: { path }, ...rest } = this.props
    const { mobilization, widget, location, widgetsIsLoaded } = this.props

    return !mobilization || !widgetsIsLoaded ? <Loading /> : (
      <SettingsPageLayout>
        <SettingsMenu mobilization={mobilization} widget={widget} location={location} />
        <SettingsPageContentLayout>
          <Route exact path={`${path}`} render={injectProps(Adjustments, rest)} />
          <Route exact path={`${path}/autofire`} render={injectProps(Autofire, rest)} />
          <Route exact path={`${path}/finish`} render={injectProps(Finish, rest)} />
          <Route exact path={`${path}/settings`} render={injectProps(Settings, rest)} />
        </SettingsPageContentLayout>
      </SettingsPageLayout>
    )
  }
}

const mapStateToProps = (state, props) => {
  const { match: { params: { widget_id: widgetId } } } = props
  const selectors = MobSelectors(state, props)

  return {
    widgetsIsLoaded: selectors.widgetsIsLoaded(),
    mobilization: selectors.getMobilization(),
    widget: selectors.getWidget(widgetId)
  }
}

const mapActionsToProps = {
  asyncWidgetUpdate: asyncUpdateWidget,
  selectMobilization,
  asyncFetchWidgets
}

export default connect(mapStateToProps, mapActionsToProps)(WidgetsDonation)
