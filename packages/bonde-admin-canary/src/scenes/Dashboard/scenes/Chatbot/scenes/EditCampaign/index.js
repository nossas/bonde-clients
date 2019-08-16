import React from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import { Flexbox2 as Flexbox, Icon } from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'
import { SubmitButton } from 'components/Form'
import { Route } from 'services/auth'
import { ContentPage, FormContentPage } from 'scenes/Dashboard/components'
import campaigns from 'scenes/Dashboard/campaigns'
import CampaignDiagram from './components/CampaignDiagram'

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

Navigation.propTypes = {
  // is very important this prop be a reference of outside component match
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
}

const formName = 'EditCampaignForm'

const ChatbotEditCampaignPage = ({ match, community }) => {
  const onSubmit = (values) => {
    // TODO: save on graphql
    // eslint-disable-next-line no-console
    console.log('onSubmit', values)
    toast('Salvo com sucesso!')
  }

  // TODO: buscar campanha de acordo com URL
  const campaign = campaigns.filter(c => c.id === Number(match.params.campaignId))[0]
  const componentProps = {
    community,
    title: campaign.name,
    backward: match.url.replace(/\/campaign\/+\d+/, ''),
    // eslint-disable-next-line react/display-name
    tabs: (props) => <Navigation {...props} match={match} />
  }
  return (
    <React.Fragment>
      <Route
        exact
        path={match.path}
        component={FormContentPage}
        componentProps={{
          ...componentProps,
          render: CampaignDiagram,
          formProps: { name: formName, onSubmit },
          // eslint-disable-next-line react/display-name
          actions: () => <SubmitButton formName={formName}>Salvar e publicar</SubmitButton>
        }}
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
