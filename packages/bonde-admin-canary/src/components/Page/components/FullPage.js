import React from 'react'
import {
  Button,
  Header,
  Navbar,
  Page,
  Footer,
  Title,
  Flexbox2 as Flexbox,
} from 'bonde-styleguide'
import { translate } from 'services/i18n'
import { Tourtip } from 'components/Tourtip'
import { CommunitiesDropdown, UserDropdown } from './Navigation'
import Zendesk from './Zendesk'

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

class FullPage extends React.Component {

  constructor (props) {
    super(props)
    this.state = { height: 0 }
  }

  componentDidMount () {
    const height = document.getElementById('fixedHeader').clientHeight
    if (height > 0) {
      this.setState({ height })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const height = document.getElementById('fixedHeader').clientHeight
    if (prevState.height !== height) {
      this.setState({ height })
    }
  }

  render () {
    const { children, pageTitle, actions, t } = this.props

    return (
      <React.Fragment>
        <Header id='fixedHeader'>
          <Navbar>
              <Tourtip
                tourName='tour'
                title='Gerencie seu BONDE por aqui'
                description='Aqui em cima você confere em que página está e navega entre as principais sessões das suas comunidades e mobilizações.'
                step={1}
              >
                <CommunitiesDropdown path='/communities'/>
              </Tourtip>
            <UserDropdown />
          </Navbar>
          <Flexbox middle spacing='between'>
            {pageTitle && (
              <Title.H3 color='#fff'>{pageTitle}</Title.H3>
            )}
            {actions && (
              <Tourtip
                tourName='tour'
                title='Fique de olho nesse caminho'
                description='Seu perfil, suas notificações e as principais ações sempre ficam por aqui.'
                step={2}
                placement='bottom-right'
              >
                <ActionBox actions={actions} />
              </Tourtip>
            )}
          </Flexbox>
        </Header>
        <Page top={this.state.height}>
          {children}
        </Page>
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
      </React.Fragment>
    )
  }
}

export default translate('page')(FullPage)
