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

const DefaultActionButtons = ({ t, noActionButtons, ActionButtonsWrapper }) => (
  noActionButtons ? null : ({ Wrapper }) => (
  <ActionButtonsWrapper>
    <Wrapper>
      <Button dark onClick={() => alert('Button: onClick')}>
        {t('actionButtons.mobilization')}
      </Button>,
      <Button onClick={() => alert('Button: onClick')}>
        {t('actionButtons.community')}
      </Button>
    </Wrapper>
  </ActionButtonsWrapper>
))

const PageAdmin = ({ children, t, Title, noActionButtons, ActionButtonsWrapper }) => (
  <React.Fragment>
    <Header
      PageTitle={Title}
      navbar={DefaultNavBar}
      ActionButtons={DefaultActionButtons({ t, noActionButtons, ActionButtonsWrapper })}
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

const { oneOfType, string, func, node, bool } = PropTypes

PageAdmin.propTypes = {
  Title: oneOfType([string, func, node]),
  ActionButtonsWrapper: oneOfType([func, node]),
  noActionButtons: bool,
}

PageAdmin.defaultProps = {
  ActionButtonsWrapper: ({ children }) => <React.Fragment>{children}</React.Fragment>
}

export default translate('components-page-admin')(PageAdmin)
