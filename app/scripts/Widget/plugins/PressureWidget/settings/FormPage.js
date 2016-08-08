import React, { PropTypes } from 'react'

import { SettingsBase } from '../../../components'

import SettingsMenu from './SettingsMenu'


const FormPage = ({ location, mobilization, widget }) => {

  return (
    <div className="widget settings">
      <SettingsMenu
        location={location}
        mobilization_id={mobilization.id}
        widget_id={widget.id} />
      <h2>Formulário</h2>
    </div>
  )
}

FormPage.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  mobilization: PropTypes.object.isRequired, // MobilizationDashboardContainer
  widget: PropTypes.object.isRequired, // MobilizationDashboardContainer
}

export default FormPage
