import React from 'react'
import { Page as Content, Header, Navbar, Flexbox2 as Flexbox, Title } from 'bonde-styleguide'
import { translate } from 'services/i18n'
import { Tourtip } from 'components/Tourtip'
import { CommunitiesDropdown, UserDropdown } from './Navigation'

import Footer from './PageFooter'

class ResizePage extends React.Component {
  
  constructor (props) {
    super(props)
    this.state = { height: 0 }
  }

  componentDidMount () {
    const height = document.getElementById(this.props.headerID).clientHeight
    if (height > 0) {
      this.setState({ height })
    }
  }

  componentDidUpdate (prevProps, prevState) {
    const height = document.getElementById(this.props.headerID).clientHeight
    if (prevState.height !== height) {
      this.setState({ height })
    }
  }

  render () {

    const { actionMenu: ActionMenu } = this.props

    return (
      <React.Fragment>
        <Header id={this.props.headerID}>
          <Navbar>
            <Tourtip
              tourName='tour'
              title='Gerencie seu BONDE por aqui'
              description='Aqui em cima você confere em que página está e navega entre as principais sessões das suas comunidades e mobilizações.'
              step={1}
            >
              <CommunitiesDropdown path='/communities' />
            </Tourtip>
            <UserDropdown />
          </Navbar>
          <Flexbox middle spacing='between'>
            {this.props.pageTitle && (<Title.H3 color='#fff'>{this.props.pageTitle}</Title.H3>)}
            {ActionMenu && (
              <Tourtip
                tourName='tour'
                title='Fique de olho nesse caminho'
                description='Seu perfil, suas notificações e as principais ações sempre ficam por aqui.'
                step={2}
                placement='bottom-right'
              >
                <ActionMenu />
              </Tourtip>
            )}
          </Flexbox>
        </Header>
        <Content top={this.state.height}>
          {this.props.children}
        </Content>
        <Footer />
      </React.Fragment>
    )
  }
}

export default translate('page')(ResizePage)
