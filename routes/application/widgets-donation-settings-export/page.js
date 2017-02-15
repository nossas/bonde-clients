import React, { PropTypes } from 'react'

import { Loading } from '~components/await'
import { SettingsPageLayout, SettingsPageContentLayout } from '~components/layout'
import { SettingsMenu } from '~widget-plugins/donation/components'
import { DataExport } from '~mobilizations/widgets/components'

const DonationSettingsExportPage = props => !props.widget ? <Loading /> : (
  <SettingsPageLayout>
    <SettingsMenu {...props} />
    <SettingsPageContentLayout>
      <DataExport {...props} />
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

DonationSettingsExportPage.propTypes = {
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

export default DonationSettingsExportPage
