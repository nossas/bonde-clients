import React from 'react'
import PropTypes from 'prop-types'
import { Flexbox2 as Flexbox, Title, Icon, Spacing } from 'bonde-styleguide'
import { ButtonLink } from 'components/Link'
import { Route } from 'services/auth'
import campaigns from 'scenes/Dashboard/campaigns'

const ContentLayout = ({ backward, title, render, ...rest }) => (
  <div className='content-layout'>
    {backward && (
      <ButtonLink flat to={backward} padding='0!important'>
        <Flexbox horizontal>
          <Spacing margin={{ right: 5, top: 1 }}>
            <Icon name='arrow-left' />
          </Spacing>
          <Title.H5>{title}</Title.H5>
        </Flexbox>
      </ButtonLink>
    )}
    {React.createElement(render, {...rest})}
  </div>
)

const DefaultRender = () => (
  <h2>DefaultRender</h2>
)

const ChatbotEditCampaignPage = ({ match, community, baseUrl }) => {
  // TODO: buscar campanha de acordo com URL
  const campaign = campaigns.filter(c => c.id === Number(match.params.campaignId))[0]
  const componentProps = {
    community,
    title: campaign.name,
    backward: match.url.replace(/\/campaign\/+\d+/, ''),
    render: DefaultRender
  }
  return (
    <React.Fragment>
      <Route
        exact
        path={match.path}
        component={ContentLayout}
        componentProps={componentProps}
      />
      <Route
        exact
        path={`${match.path}/settings`}
        component={ContentLayout}
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
