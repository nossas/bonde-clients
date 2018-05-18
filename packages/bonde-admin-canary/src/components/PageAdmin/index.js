import React from 'react'
import PropTypes from 'prop-types'
import { translate } from '../../services/i18n'
import {
  Header, Page, Footer,
  Navbar, MainNav, UserNav,
  Button
} from 'bonde-styleguide'

const DefaultNavBar = () => (
  <Navbar>
    <MainNav />
    <UserNav />
  </Navbar>
)

const DefaultActionButtons = ({ t, noActionButtons }) => noActionButtons ? [] : [
  <Button dark onClick={() => alert('Button: onClick')}>
    {t('actionButtons.mobilization')}
  </Button>,
  <Button onClick={() => alert('Button: onClick')}>
    {t('actionButtons.community')}
  </Button>
]

const PageAdmin = ({ children, t, title, noActionButtons }) => (
  <React.Fragment>
    <Header
      pageTitle={title}
      navbar={DefaultNavBar}
      actionButtons={DefaultActionButtons({ t, noActionButtons })}
    />

    <Page>
      {children}
    </Page>

    <Footer
      btnHelpLabel={t('footer.help')}
      btnHelpClick={() => alert('help clicked!')}
    >
      <a href='#about' title={t('footer.about')}>
        {t('footer.about')}
      </a>
      <a href='#contact' title={t('footer.contact')}>
        {t('footer.contact')}
      </a>
    </Footer>
  </React.Fragment>
)

const { string, bool } = PropTypes

PageAdmin.propTypes = {
  title: string,
  noActionButtons: bool,
}

export default translate('components-page-admin')(PageAdmin)
