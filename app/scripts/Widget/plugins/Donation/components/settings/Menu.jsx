import React, { PropTypes } from 'react'

import * as Paths from '../../../../../Paths'
import { TabMenuItem } from '../../../../../components'

const Menu = ({ mobilization, widget, location }) => {
  const donationPath = Paths.donationMobilizationWidget(mobilization.id, widget.id)
  const autofirePath = Paths.autofireMobilizationWidget(mobilization.id, widget.id)

  return (
    <div className='bg-white px3 clearfix'>
      <h2 className="mb3">Configure o bloco de doação</h2>
      <div>
        <ul className='list-reset mb0'>
          <TabMenuItem
            path={donationPath}
            text='Ajustes'
            isActive={donationPath === location.pathname} />
          <TabMenuItem
            path={autofirePath}
            text='Mensagem agradecimento'
            isActive={autofirePath === location.pathname} />
        </ul>
      </div>
    </div>
  )
}

Menu.propTypes = {
  mobilization: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  widget: PropTypes.shape({ id: PropTypes.number.isRequired }).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string.isRequired }).isRequired
}

export default Menu
