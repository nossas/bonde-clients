import React from 'react'
import {
  Button,
  Header,
  Navbar,
  Page,
  Footer,
  Title,
  Flexbox2 as Flexbox,
  Dropdown,
  DropdownItem,
  DropdownHeader,
  Icon
} from 'bonde-styleguide'
import { translate } from '../../../services/i18n'
import { auth } from '../../../services/auth'

const CommunitiesDropdown = ({ communities }) => {
  return communities ? (
    <Dropdown>
      {communities.map((c, i) => (
        <DropdownItem key={`communityMenu-${i}`}>{c.name}</DropdownItem>
      ))}
    </Dropdown>
  ) : <div />
}

const UserDropdown = auth()(({ user }) => {
  
  const name = `${user.firstName} ${user.lastName}`
  
  return (
    <Dropdown label={name} icon='sound' width={190}>
      <DropdownHeader>
        <img
          src={user.avatarUrl || 'http://via.placeholder.com/35x35?text=U'}
          alt={ name}
        />
        <span>{name}</span>
      </DropdownHeader>
      <DropdownItem><Icon name='user' /> Perfil</DropdownItem>
      <DropdownItem><Icon name='times' /> Sair</DropdownItem>
    </Dropdown>
  )
})

const ActionBox = ({ actions }) => (
  <Flexbox>
    {actions.map(({ label, ...props }, i) => (
      <Button
        key={`actionButton-${i}`}
        title={label}
        margin={{ left: 17 }}
        {...props}
      >
        {label}
      </Button>
    ))}
  </Flexbox>
)

const FullPage = (props) => {
 
  const { children, pageTitle, actions, t } = props

  return (
    <React.Fragment>
      <Header>
        <Navbar>
          <CommunitiesDropdown />
          <UserDropdown />
        </Navbar>
        <Flexbox middle spacing='between'>
          {pageTitle && (<Title.H3 color='#fff'>{pageTitle}</Title.H3>)}
          {actions && (<ActionBox actions={actions} />)}
        </Flexbox>
      </Header>
      <Page>
        {children}
      </Page>
      <Footer
        btnHelpLabel={t('footer.help')}
        btnHelpClick={() => alert('help clicked!')}
      >
        <a href='#about' title={t('footer.about')}>{t('about')}</a>
        <a href='#contact' title={t('footer.contact')}>{t('contact')}</a>
      </Footer>
    </React.Fragment>
  )
}

export default translate('page')(FullPage)
