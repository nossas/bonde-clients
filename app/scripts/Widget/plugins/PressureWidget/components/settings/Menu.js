import React, { PropTypes } from 'react'

import * as Paths from '../../../../../Paths'

import { TabMenu, TabMenuItem } from '../../../../../components'
import { Tabs, Tab } from '../../../../../../components/Navigation'


const Menu = ({ location, mobilization_id, widget_id }) => {

  const formPath = Paths.formPressureWidget(mobilization_id, widget_id)
  const emailPath = Paths.emailPressureWidget(mobilization_id, widget_id)
  const autofirePath = Paths.autofireMobilizationWidget(mobilization_id, widget_id)

  return (
    <div className="bg-white pt3 pr4 pl5">
      <h1 className='h1 mt0 mb3'>Configure seu formulário de pressão</h1>
      <Tabs>
        <Tab
          path={formPath}
          text='Formulário'
          isActive={formPath === location.pathname}
        />
        <Tab
          path={emailPath}
          text='E-mail para alvo'
          isActive={emailPath === location.pathname}
        />
        <Tab
          path={autofirePath}
          text='Mensagem de agradecimento'
          isActive={autofirePath === location.pathname}
        />
      </Tabs>
    </div>
  )
}

Menu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  mobilization_id: PropTypes.number.isRequired,
  widget_id: PropTypes.number.isRequired,
}

export default Menu
