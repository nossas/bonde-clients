import React from 'react'
import { Route } from 'react-router'

import { ShareContainer } from '../../../../modules/widgets/__plugins__/match/containers'

export default ({ prefix }) => (
  <Route
    path={`${prefix || ''}/matches/:match_id/share`}
    component={ShareContainer}
  />
)
