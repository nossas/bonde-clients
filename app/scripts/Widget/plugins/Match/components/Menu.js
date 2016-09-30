import React from 'react'

import * as Paths from '../../../../Paths'
import { Tabs, Tab } from '../../../../../components/Navigation'

const Menu = ({ mobilization, widget, location }) => {
  const choicesPath = Paths.matchChoicesMobilizationWidget(mobilization.id, widget.id)
  const goalsPath = Paths.matchGoalsMobilizationWidget(mobilization.id, widget.id)

  return (
    <div className="bg-white pt3 pr4 pl5">
      <h1 className='h1 mt0 mb3'>Configure as combinações da sua ação</h1>
      <Tabs>
        <Tab
          path={choicesPath}
          text="Opções de combinação"
          isActive={choicesPath === location.pathname}
        />
        <Tab
          path={goalsPath}
          text="Resultados das combinações"
          isActive={goalsPath === location.pathname}
        />
      </Tabs>
    </div>
  )
}

export default Menu
