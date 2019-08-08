import React, { Component } from 'react'
import {
  Grid,
  Cell,
  Flexbox2 as Flexbox
} from 'bonde-styleguide'
import ReactJson from 'react-json-view'
import { Page, Header } from 'components/PageLogged'
import {
  ChatbotForm,
  ChatbotList,
  ChatbotCampaignsForm,
  ChatbotCampaignsList,
  ChatbotSettingsForm,
  ChatbotSettingsList
} from './components'

class Root extends Component {
  constructor (props) {
    super(props)
    this.state = { chatbot: undefined }
    this.handleUpdateScene = this.handleUpdateScene.bind(this)
  }

  handleUpdateScene () {
    this.forceUpdate()
  }

  selectChatbot (chatbot) {
    this.setState({ chatbot })
  }

  render () {
    return (
      <Page renderTitle={() => (<Header.Title>Chatbot Components</Header.Title>)}>
        <Flexbox vertical>
          <Grid>
            <Cell size={[12, 12, 12]}>
              <Grid>
                <Cell size={[6, 6, 12, 12, 12, 12]}>
                  <ChatbotForm
                    communityId={1}
                    updateScene={this.handleUpdateScene}
                  />
                </Cell>
                <Cell size={[6, 6, 12, 12, 12, 12]}>
                  <ChatbotList
                    communityId={1}
                    dataListComponent={({ chatbots }) => {
                      return (
                        <ul>
                          {chatbots.map((chatbot, i) => (
                            <li key={`chatbot-${i}`}>
                              <p>{chatbot.name}</p>
                              <small style={{ cursor: 'pointer', color: 'blue' }} onClick={() => this.selectChatbot(chatbot)}>ABRIR</small>
                            </li>
                          ))}
                        </ul>
                      )
                    }}
                  />
                </Cell>
              </Grid>
            </Cell>
            {this.state.chatbot && (
              <React.Fragment>
                <Cell size={[12, 12, 12]}>
                  <Grid>
                    <Cell size={[6, 6, 12, 12, 12, 12]}>
                      <ChatbotSettingsForm chatbotId={this.state.chatbot.id} updateScene={this.handleUpdateScene} />
                    </Cell>
                    <Cell size={[6, 6, 12, 12, 12, 12]}>
                      <ChatbotSettingsList
                        chatbotId={this.state.chatbot.id}
                        dataListComponent={({ chatbotSettings }) => {
                          return (
                            <ul>
                              {chatbotSettings.map((config, i) => (
                                <li key={`chatbot-settings-${i}`}>
                                  <p>{config.channel}</p>
                                  <ReactJson src={JSON.parse(config.settings)} />
                                </li>
                              ))}
                            </ul>
                          )
                        }}

                      />
                    </Cell>
                  </Grid>
                </Cell>
                <Cell size={[12, 12, 12]}>
                  <Grid>
                    <Cell size={[6, 6, 12, 12, 12, 12]}>
                      <ChatbotCampaignsForm chatbotId={this.state.chatbot.id} updateScene={this.handleUpdateScene} />
                    </Cell>
                    <Cell size={[6, 6, 12, 12, 12, 12]}>
                      <ChatbotCampaignsList
                        chatbotId={this.state.chatbot.id}
                        dataListComponent={({ chatbotCampaigns }) => {
                          return (
                            <ul>
                              {chatbotCampaigns.map((campaign, i) => (
                                <li key={`chatbot-settings-${i}`}>
                                  <p>{campaign.name}</p>
                                  <ReactJson src={JSON.parse(campaign.diagram)} />
                                </li>
                              ))}
                            </ul>
                          )
                        }}

                      />
                    </Cell>
                  </Grid>
                </Cell>
              </React.Fragment>
            )}
          </Grid>
        </Flexbox>
      </Page>
    )
  }
}

export default Root
