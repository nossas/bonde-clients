import React from 'react'
import { I18n } from 'react-i18next'
import { Auth } from 'services/auth'
import CreateUserTagsForm from './CreateUserTagsForm'

export default (props) => (
  <I18n ns='tags'>
  {(t) => (
    <Auth>
    {({ user }) => (
      <CreateUserTagsForm
        t={t}
        user={user}
      />
    )}
    </Auth>
  )}
  </I18n>
)
