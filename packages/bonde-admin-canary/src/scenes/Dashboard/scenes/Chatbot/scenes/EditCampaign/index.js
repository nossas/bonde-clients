import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox2 as Flexbox, Icon } from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'
import { Route } from 'services/auth'
import { ContentPage } from 'scenes/Dashboard/components'
import campaigns from 'scenes/Dashboard/campaigns'
import CampaignDiagram from './components/CampaignDiagram'

const DefaultRender = () => (
  <h2>DefaultRender</h2>
)

const Navigation = ({ match, location }) => {
  const baseUrl = location.pathname.replace(match.url, '')
  return (
    <Flexbox horizontal middle>
      <ButtonLink flat to={`${match.url}/new`} active={baseUrl === '/new'}>Criar</ButtonLink>
      <Icon name='arrow-right' />
      <ButtonLink flat active={match.isExact} to={match.url}>Editar</ButtonLink>
      <Icon name='arrow-right' />
      <ButtonLink flat to={`${match.url}/detail`} active={baseUrl === '/detail'}>Detalhes</ButtonLink>
    </Flexbox>
  )
}

const ChatbotEditCampaignPage = ({ match, community }) => {
  // TODO: buscar campanha de acordo com URL
  const campaign = campaigns.filter(c => c.id === Number(match.params.campaignId))[0]
  const componentProps = {
    community,
    title: campaign.name,
    backward: match.url.replace(/\/campaign\/+\d+/, ''),
    tabs: (props) => <Navigation {...props} match={match} />
  }
  return (
    <React.Fragment>
      <Route
        exact
        path={match.path}
        component={ContentPage}
        componentProps={{ ...componentProps, render: CampaignDiagram }}
      />
      <Route
        exact
        path={`${match.path}/detail`}
        component={ContentPage}
        componentProps={componentProps}
      />
      <Route
        exact
        path={`${match.path}/new`}
        component={ContentPage}
        componentProps={componentProps}
      />
    </React.Fragment>
  )
}

ChatbotEditCampaignPage.propTypes = {
  match: PropTypes.object.isRequired,
  community: PropTypes.object.isRequired
}

export default ChatbotEditCampaignPage
