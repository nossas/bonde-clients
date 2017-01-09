import React, { PropTypes } from 'react'

// Global module dependencies
import { SettingsPageLayout } from '../../../../../components/Layout'

// Current module dependencies
import { Menu } from '../../../../../scripts/Widget/plugins/PressureWidget/components/settings'

const SettingsBase = ({ children, location, mobilization, widget }) => (
  <SettingsPageLayout>
    <Menu
      location={location}
      mobilization_id={mobilization.id}
      widget_id={widget.id}
    />
    {children}
  </SettingsPageLayout>
)

SettingsBase.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired
}

export default SettingsBase
