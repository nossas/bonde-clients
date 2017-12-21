import React from 'react'
import { Route } from 'react-router-dom'

import MobilizationList from '~routes/admin/authenticated/sidebar/mobilizations-list/page.connected'
import MobilizationsNew from '~routes/admin/authenticated/sidebar/mobilizations-new/page.connected'
import MobilizationsEdit from '~routes/admin/authenticated/sidebar/mobilizations-edit/page.connected'
import MobilizationsLaunch from '~routes/admin/authenticated/sidebar/mobilizations-launch/page.connected'
import MobilizationsLaunchEnd from '~routes/admin/authenticated/sidebar/mobilizations-launch-end/page.connected'
import MobilizationsSettings from '~root/routes-v1/subroutes/mobilizations-settings'

const MobilizationsRoutes = ({ match: { path } }) => (
  <React.Fragment>
    <Route exact path={`${path}`} component={MobilizationList} />
    <Route exact path={`${path}/new`} component={MobilizationsNew} />
    <Route exact path={`${path}/:mobilization_id/edit`} component={MobilizationsEdit} />
    <Route exact path={`${path}/:mobilization_id/launch`} component={MobilizationsLaunch} />
    <Route exact path={`${path}/:mobilization_id/launch/end`} component={MobilizationsLaunchEnd} />

    <Route path={`${path}/:mobilization_id/settings`} component={MobilizationsSettings} />
  </React.Fragment>
)

export default MobilizationsRoutes
