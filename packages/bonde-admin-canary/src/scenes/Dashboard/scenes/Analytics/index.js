import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'services/auth'
import { ContentPage } from 'scenes/Dashboard/components'
import Dashboard from './components/Dashboard'
import Activists from './components/Activists'
import Report from './components/Report'

const AnalyticsPage = ({ match, community }) => (
  <React.Fragment>
    <Route
      exact
      path={match.path}
      component={ContentPage}
      componentProps={{ community, render: Dashboard }}
    />
    <Route
      exact
      path={`${match.path}/activists`}
      component={ContentPage}
      componentProps={{ community, render: Activists }}
    />
    <Route
      exact
      path={`${match.path}/report`}
      component={ContentPage}
      componentProps={{ community, render: Report }}
    />
  </React.Fragment>
)

AnalyticsPage.propTypes = {
  match: PropTypes.object.isRequired,
  community: PropTypes.object.isRequired
}

export default AnalyticsPage
