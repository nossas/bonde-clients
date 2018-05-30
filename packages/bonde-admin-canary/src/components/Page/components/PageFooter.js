import React from 'react'
import { Footer } from 'bonde-styleguide'
import { translate } from 'services/i18n'
import Zendesk from './Zendesk'

export default translate('page')(
  ({ t }) => (
    <Footer>
      <a
        href='http://www.bonde.org'
        title={t('footer.about')}
        target='_blank'
        rel='noopener noreferrer'
      >
        {t('footer.about')}
      </a>
      <a
        href='mailto:contato@bonde.org'
        title={t('footer.contact')}
        target='_blank'
        rel='noopener noreferrer'
      >
        {t('footer.contact')}
      </a>
      <Zendesk />
    </Footer>
  )
)
