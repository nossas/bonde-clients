import React from 'react'

import * as Paths from '../../../../Paths'
import { Menu } from './'

const MatchPage = ({ widget, mobilization, location, children }) => (
  <div className="flex-auto flex flex-column bg-silver gray relative">
    <Menu widget={widget} mobilization={mobilization} location={location} />
    {children}
  </div>
)

export default MatchPage
