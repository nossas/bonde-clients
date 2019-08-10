import React from 'react'
import PropTypes from 'prop-types'
import { I18n } from 'react-i18next'
import Dialog from './Dialog'

const HeaderDialog = ({ children }) => (
  <I18n ns='home'>
    {t => (
      <Dialog
        t={t}
        step={1}
        placement='bottom-left'
        margin={{ left: 125 }}
      >
        {children}
      </Dialog>
    )}
  </I18n>
)

HeaderDialog.propTypes = {
  children: PropTypes.any
}

export default HeaderDialog
