import React, { Component } from 'react'
import { I18n } from 'react-i18next'
import { Flexbox2 as Flexbox } from 'bonde-styleguide'
import { Redirect } from 'services/router'
import { Page, Header } from 'components/PageLogged'
import { Auth } from 'services/auth'
import { BondeDiagram, BondeDiagramApplication } from 'bonde-diagram'
import 'bonde-diagram/lib/sass/main.scss'

export default class extends Component {
  render() {
    const app = new BondeDiagramApplication()

    return (
      <I18n ns='home'>
        {t => (
          <Auth>
            {({ user }) => user.tags.length < 1
              ? <Redirect to='/admin/tags' />
              : (
                <Page
                  renderTitle={() => (<Header.Title>Chatbot</Header.Title>)}
                >
                  <Flexbox vertical>
                    <BondeDiagram app={app} />
                  </Flexbox>
                </Page>
              )
            }
          </Auth>
        )}
      </I18n>
    )
  }
}
