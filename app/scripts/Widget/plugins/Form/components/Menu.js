import React, { PropTypes } from 'react'
import * as Paths from './../../../../Paths'
import { TabMenuItem } from './../../../../components'
import { Tabs, Tab } from '../../../../../components/Navigation'

const Menu = ({ mobilization, widget, location }) => {
  const fieldsPath = Paths.fieldsMobilizationWidget(mobilization.id, widget.id)
  const formPath = Paths.formMobilizationWidget(mobilization.id, widget.id)
  const autofirePath = Paths.autofireMobilizationWidget(mobilization.id, widget.id)
  const exportPath = Paths.exportWidgetData(mobilization.id, widget.id)

  return (
    <div className="bg-white pt3 pr4 pl5">
      <h1 className='h1 mt0 mb3'>Configure o formulário da sua ação</h1>
      <Tabs>
        <Tab
          path={fieldsPath}
          text='Campos do formulário'
          isActive={fieldsPath === location.pathname}
        />
        <Tab
          path={formPath}
          text='Ajustes'
          isActive={formPath === location.pathname}
        />
        <Tab
          path={autofirePath}
          text='Mensagem agradecimento'
          isActive={autofirePath === location.pathname}
        />
        <Tab
          path={exportPath}
          text='Relatório'
          isActive={exportPath === location.pathname}
        />
      </Tabs>
    </div>
  )
}

Menu.propTypes = {
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

export default Menu
