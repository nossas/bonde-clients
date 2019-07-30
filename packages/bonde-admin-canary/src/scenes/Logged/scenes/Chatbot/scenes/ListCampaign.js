import React, { Component } from 'react'
import { I18n } from 'react-i18next'
import { Grid, Cell, Flexbox2 as Flexbox } from 'bonde-styleguide'
import { Page, Header } from 'components/PageLogged'

class ListCampaign extends Component {
  render () {
    return (
      <I18n ns='home'>
        {t => (
          <Page renderTitle={() => (<Header.Title>Chatbot</Header.Title>)}>
            <Flexbox vertical>
              <Grid>
                <Cell size={[12, 12, 12]}>
                  <h2>Lista de campanhas</h2>
                </Cell>
              </Grid>
            </Flexbox>
          </Page>
        )}
      </I18n>
    )
  }
}

export default ListCampaign
