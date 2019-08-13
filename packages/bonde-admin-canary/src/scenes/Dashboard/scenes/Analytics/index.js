import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'services/auth'
import Dashboard from './components/Dashboard'
import Activists from './components/Activists'
import Report from './components/Report'

const AnalyticsPage = ({ match, community }) => (
  <React.Fragment>
    <Route
      exact
      path={match.path}
      component={Dashboard}
      componentProps={{ community }}
    />
    <Route
      exact
      path={`${match.path}/activists`}
      component={Activists}
      componentProps={{ community }}
    />
    <Route
      exact
      path={`${match.path}/report`}
      component={Report}
      componentProps={{ community }}
    />
  </React.Fragment>
)

AnalyticsPage.propTypes = {
  match: PropTypes.object.isRequired,
  community: PropTypes.object.isRequired
}

export default AnalyticsPage
