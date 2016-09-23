import React, { PropTypes } from 'react'

import * as Paths from '../../../../../Paths'
import { Tabs, Tab } from '../../../../../../components/Navigation'

const Menu = ({ mobilization, widget, location }) => {
  const donationPath = Paths.donationMobilizationWidget(mobilization.id, widget.id)
  const autofirePath = Paths.autofireMobilizationWidget(mobilization.id, widget.id)

  return (
    <div className="bg-white pt3 pr4 pl5">
      <h1 className="h1 mt0 mb3">Configure o bloco de doação</h1>
      <Tabs>
        <Tab
          text="Ajustes"
          path={donationPath}
          isActive={donationPath === location.pathname}
        />
        <Tab
          text="Mensagem agradecimento"
          path={autofirePath}
          isActive={autofirePath === location.pathname}
        />
      </Tabs>
    </div>
  )
}

Menu.propTypes = {
  mobilization: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  widget: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired
}

export default Menu
