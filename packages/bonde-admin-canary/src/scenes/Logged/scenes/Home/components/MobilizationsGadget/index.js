import React from 'react'
import { I18n } from 'react-i18next'
import MobilizationsGadget from './MobilizationsGadget'

export { default as query } from './query.graphql'

export default () => (
  <I18n ns='home'>
    {(t) => <MobilizationsGadget t={t} />}
  </I18n>
)
