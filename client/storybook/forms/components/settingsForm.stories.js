import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import {
  SettingsPageLayout,
  SettingsPageMenuLayout,
  SettingsPageContentLayout
} from '~client/storybook/settings/components'
import {
  SettingsForm
} from '~client/storybook/forms/components'


storiesOf('Formulário de configuração', module)
 .addDecorator(story => (
    <SettingsPageLayout>
      <SettingsPageMenuLayout title='Configure seu widget' />
      <SettingsPageContentLayout>
        {story()}
      </SettingsPageContentLayout>
    </SettingsPageLayout>
  ))
  .add('default', () => (
    <SettingsForm />
  ))
  .add('when submitting', () => (
    <SettingsForm submitting={true} />
  ))
