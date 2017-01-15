import React, { PropTypes } from 'react'

// Global module dependencies
import * as Paths from '../../../../../scripts/Paths'
import { Tabs, Tab } from '../../../../../components/Navigation'
import { SettingsPageMenuLayout } from '../../../../../components/Layout'

const SettingsMenu = ({ location, mobilization_id, widget_id }) => {
  const formPath = Paths.formPressureWidget(mobilization_id, widget_id)
  const emailPath = Paths.emailPressureWidget(mobilization_id, widget_id)
  const finishPath = Paths.finishPressureWidget(mobilization_id, widget_id)
  const autofirePath = Paths.autofireMobilizationWidget(mobilization_id, widget_id)

  return (
    <SettingsPageMenuLayout title='Configure seu formulário de pressão'>
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
        <Tab
          path={finishPath}
          text='Pós-pressão'
          isActive={finishPath === location.pathname}
        />
      </Tabs>
    </SettingsPageMenuLayout>
  )
}

SettingsMenu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  mobilization_id: PropTypes.number.isRequired,
  widget_id: PropTypes.number.isRequired
}

export default SettingsMenu
