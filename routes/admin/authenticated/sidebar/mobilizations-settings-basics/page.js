import React from 'react'
import { startSubmit, stopSubmit } from 'redux-form'
import { SettingsPageLayout, SettingsPageContentLayout } from '~client/components/layout'
import { SettingsMenu, MobilizationBasicsForm } from '~client/mobilizations/components'

const MobilizationsSettingsBasicsPage = ({ dispatch, ...props }) => (
  <SettingsPageLayout>
    <SettingsMenu {...props} />
    <SettingsPageContentLayout>
      <MobilizationBasicsForm
        floatSubmit
        onFinishSubmit={mobilization => {
          // fix to show up the success message
          if (mobilization) {
            dispatch(startSubmit(props.formName))
            dispatch(stopSubmit(props.formName))
          }
        }}
        {...props}
      />
    </SettingsPageContentLayout>
  </SettingsPageLayout>
)

export default MobilizationsSettingsBasicsPage
