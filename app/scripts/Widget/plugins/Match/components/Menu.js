import React from 'react'

import * as Paths from '../../../../Paths'
import { TabMenu, TabMenuItem } from '../../../../components'

const Menu = ({ mobilization, widget, location }) => {
  const choicesPath = Paths.matchChoicesMobilizationWidget(mobilization.id, widget.id)
  const goalsPath = Paths.matchGoalsMobilizationWidget(mobilization.id, widget.id)

  return (
    <TabMenu title="Configure as combinações da sua ação">
      <TabMenuItem
        path={choicesPath}
        text='Opções de combinação'
        isActive={choicesPath === location.pathname} />
      <TabMenuItem
        path={goalsPath}
        text='Resultados das combinações'
        isActive={goalsPath === location.pathname} />
    </TabMenu>
  )
}

export default Menu
