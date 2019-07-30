import React, { Component } from 'react'
import { I18n } from 'react-i18next'
import { Grid, Cell, Flexbox2 as Flexbox } from 'bonde-styleguide'
import { Page, Header } from 'components/PageLogged'
import { BondeDiagram, BondeDiagramApplication } from 'bonde-diagram'
import 'bonde-diagram/lib/sass/main.scss'

class Chatbot extends Component {
  constructor (props) {
    super(props)
    this.app = new BondeDiagramApplication()
  }

  render () {
    return (
      <I18n ns='home'>
        {t => (
          <Page renderTitle={() => (<Header.Title>Chatbot</Header.Title>)}>
            <Flexbox vertical>
              <Grid>
                <Cell size={[12, 12, 12]}>
                  <BondeDiagram app={this.app} />
                </Cell>
              </Grid>
            </Flexbox>
          </Page>
        )}
      </I18n>
    )
  }
}

export default Chatbot
