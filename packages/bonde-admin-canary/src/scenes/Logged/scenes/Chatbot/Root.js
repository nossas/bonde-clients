import React, { Component } from 'react'
import {
  Grid,
  Cell,
  Flexbox2 as Flexbox
} from 'bonde-styleguide'
import { Page, Header } from 'components/PageLogged'
import { ChatbotForm, ChatbotList } from './components'

class Root extends Component {
  render () {
    return (
      <Page renderTitle={() => (<Header.Title>Chatbot Components</Header.Title>)}>
        <Flexbox vertical>
          <Grid>
            <Cell size={[12, 12, 12]}>
              <Grid>
                <Cell size={[6, 6, 12, 12, 12, 12]}>
                  <ChatbotForm communityId={1} />
                </Cell>
                <Cell size={[6, 6, 12, 12, 12, 12]}>
                  <ChatbotList
                    communityId={1}
                    dataListComponent={({ chatbots }) => {
                      return (
                        <ul>
                          {chatbots.map((chatbot, i) => (
                            <li key={`chatbot-${i}`}>{chatbot.name}</li>
                          ))}
                        </ul>
                      )
                    }}
                  />
                </Cell>
              </Grid>
            </Cell>
          </Grid>
        </Flexbox>
      </Page>
    )
  }
}

export default Root