import React, { PropTypes } from 'react'

import { Loading } from '~components/await'
import { SettingsPageLayout, SettingsPageContentLayout } from '~components/layout'
import { SettingsMenu } from '~widget-plugins/form/components'
import { FormAutofire } from '~mobilizations/widgets/components'

const FormSettingsAutofirePage = props => !props.widget ? (
  <Loading />
) : (
  <SettingsPageLayout>
    <SettingsMenu {...props} />
    <SettingsPageContentLayout>
      <FormAutofire {...props} />
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

FormSettingsAutofirePage.propTypes = {
  fields: PropTypes.object.isRequired,
  mobilization: PropTypes.object.isRequired,
  widget: PropTypes.object.isRequired,
  // Actions
  asyncWidgetUpdate: PropTypes.func.isRequired
}

export default FormSettingsAutofirePage
