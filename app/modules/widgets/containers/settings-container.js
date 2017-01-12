import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

// Global module dependencies
import { SettingsPageLayout } from '../../../components/Layout'

// Parent module dependencies
import * as MobilizationSelectors from '../../mobilizations/selectors'

// Current module dependencies
import * as WidgetSelectors from '../selectors'

export const SettingsContainer = ({ children, ...rest }) => (
  <SettingsPageLayout>
    {children && React.cloneElement(children, {...rest})}
  </SettingsPageLayout>
)

SettingsContainer.propTypes = {
  children: PropTypes.object,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired
}

const mapStateToProps = (state, props) => ({
  mobilization: MobilizationSelectors.getCurrent(state, props),
  widget: WidgetSelectors.getWidget(state, props)
})

export default connect(mapStateToProps)(SettingsContainer)
