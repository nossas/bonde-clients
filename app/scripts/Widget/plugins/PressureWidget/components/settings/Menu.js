import React, { PropTypes } from 'react'

import * as Paths from '../../../../../Paths'

import { TabMenu, TabMenuItem } from '../../../../../components'


const Menu = ({ location, mobilization_id, widget_id }) => {

  const formPath = Paths.formPressureWidget(mobilization_id, widget_id)
  const emailPath = Paths.emailPressureWidget(mobilization_id, widget_id)
  const autofirePath = Paths.autofireMobilizationWidget(mobilization_id, widget_id)

  return (
    <TabMenu title="Configure seu formulário de pressão">
      <TabMenuItem
        path={formPath}
        text='Formulário'
        isActive={formPath === location.pathname} />
      <TabMenuItem
        path={emailPath}
        text='E-mail para alvo'
        isActive={emailPath === location.pathname} />
      <TabMenuItem
        path={autofirePath}
        text='Mensagem de agradecimento'
        isActive={autofirePath === location.pathname} />
    </TabMenu>
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
