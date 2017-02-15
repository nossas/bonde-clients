import React, { PropTypes } from 'react'

import { Loading } from '~components/await'
import { SettingsPageLayout, SettingsPageContentLayout } from '~components/layout'
import { SettingsMenu as FormSettingsMenu } from '~widget-plugins/form/components'
import { DataExport } from '~mobilizations/widgets/components'

const WidgetsFormSettingsExportPage = props => !props.widget ? <Loading /> : (
  <SettingsPageLayout>
    <FormSettingsMenu {...props} />
    <SettingsPageContentLayout>
      <DataExport {...props} />
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

WidgetsFormSettingsExportPage.propTypes = {
  params: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  success: PropTypes.bool,
  error: PropTypes.object,
  widget: PropTypes.object.isRequired,
  mobilization: PropTypes.object.isRequired,
  // Actions
  asyncWidgetDataExport: PropTypes.func.isRequired,
  dataExportMount: PropTypes.func.isRequired
}

export default WidgetsFormSettingsExportPage
