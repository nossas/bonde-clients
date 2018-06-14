import React from 'react'
import { Footer as FooterStyleguide } from 'bonde-styleguide'
import Zendesk from './Zendesk'

const Footer = ({ t }) => (
  <FooterStyleguide>
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
  </FooterStyleguide>
)

export default Footer
