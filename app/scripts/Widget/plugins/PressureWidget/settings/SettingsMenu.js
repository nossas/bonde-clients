import React, { PropTypes } from 'react'

import * as Paths from '../../../../Paths'

import { TabMenu, TabMenuItem } from '../../../../components'

const SettingsMenu = ({ location, mobilization_id, widget_id }) => {

  const formPath = Paths.formPressureWidget(mobilization_id, widget_id)

  return (
    <TabMenu title="Configure seu formulário de pressão">
      <TabMenuItem
        path={formPath}
        text='Formulário'
        isActive={formPath === location.pathname} />
    </TabMenu>
  )
}

SettingsMenu.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired
}

export default SettingsMenu
