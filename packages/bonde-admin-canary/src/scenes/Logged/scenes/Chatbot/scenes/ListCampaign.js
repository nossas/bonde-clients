import React, { Component } from 'react'
import { I18n } from 'react-i18next'
import { graphqlApi } from 'services/graphql'
import { Grid, Cell, Flexbox2 as Flexbox } from 'bonde-styleguide'
import Link from 'components/Link'
import { Page, Header } from 'components/PageLogged'
import chatbotCampaignsQuery from './chatbotCampaigns.graphql'

class ListCampaign extends Component {
  constructor(props) {
    super(props)
    this.state = { campaigns: [], fetching: true }
  }

  componentDidMount() {
    const { match } = this.props
    graphqlApi
      .query({
        query: chatbotCampaignsQuery,
        variables: { chatbotSettingsId: match.params.chatbotSettingsId }
      })
      .then(({ data }) => {
        this.setState({ campaigns: data['chatbot_campaigns'], fetching: false })
      })
  }
  render () {
    const { match } = this.props

    return (
      <I18n ns='home'>
        {t => (
          <Page renderTitle={() => (<Header.Title>Chatbot</Header.Title>)}>
            <Flexbox vertical>
              <Grid>
                <Cell size={[12, 12, 12]}>
                  <h2>Lista de campanhas</h2>
                  {this.state.fetching ? 'Loading ...' : (
                    <ul>
                      {this.state.campaigns.map((campaign, i) => (
                        <li key={`campaign-${i}`}>
                          <Link to={`/admin/${match.params.chatbotSettingsId}/chatbot/${campaign.id}/campaign`}>
                            {campaign.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
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
