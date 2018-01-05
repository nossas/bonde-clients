import React from 'react'
import { Route } from 'react-router-dom'

// Pages
import WidgetsDonationRoutes from '~root/routes-v1/subroutes/widgets-donation'

export default ({ match: { path } }) => (
  <React.Fragment>
    <Route path={`${path}/:widget_id/donation`} component={WidgetsDonationRoutes} />
  </React.Fragment>
)
