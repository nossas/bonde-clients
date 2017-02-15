import React, { PropTypes } from 'react'

import { Loading } from '~components/await'
import { SettingsPageLayout, SettingsPageContentLayout } from '~components/layout'
import { SettingsMenu as DonationSettingsMenu } from '~widget-plugins/donation/components'
import { FormAutofire } from '~mobilizations/widgets/components'

const WidgetsDonationSettingsAutofirePage = props => !props.widget ? (
  <Loading />
) : (
  <SettingsPageLayout>
    <DonationSettingsMenu {...props} />
    <SettingsPageContentLayout>
      <FormAutofire {...props} />
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

WidgetsDonationSettingsAutofirePage.propTypes = {
  fields: PropTypes.object.isRequired,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  // Actions
  asyncWidgetUpdate: PropTypes.func.isRequired
}

export default WidgetsDonationSettingsAutofirePage
