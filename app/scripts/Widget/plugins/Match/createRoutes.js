import React from 'react'
import { Route } from 'react-router'

import { GoalsPage } from './pages'
import { ChoicesPage } from '../../../../modules/widgets/__plugins__/match/pages'

export default () => [
  <Route path='/matches/choices' component={ChoicesPage} />,
  <Route path='/matches/goals' component={GoalsPage} />
]
