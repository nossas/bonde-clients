import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { selectors as WidgetSelectors } from '../../../modules/widgets'
import { SettingsPageLayout } from '../../../components/Layout'

export const SettingsContainer = ({ children, ...rest }) => (
  <SettingsPageLayout>
    {children && React.cloneElement(children, {...rest})}
  </SettingsPageLayout>
)

SettingsContainer.propTypes = {
  children: PropTypes.object,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  credentials: PropTypes.object.isRequired,
}

const mapStateToProps = (state, props) => ({
  widget: WidgetSelectors.getWidget(state, props),
  credentials: state.auth.credentials
})

export default connect(mapStateToProps)(SettingsContainer)
