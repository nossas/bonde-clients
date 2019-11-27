import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'services/auth'
import { MutationForm, SubmitButton } from 'components/Forms'
import { ContentPageComponent } from 'scenes/Dashboard/components'
import { allUserCommunitiesQuery, updateCommunitiesMutation } from 'scenes/Dashboard/graphql'
import InfoForm from './components/InfoForm'

/*
const pages = [

  { render: InfoForm, path: '/invite' },
  { render: InfoForm, path: '/domain' },
  { render: InfoForm, path: '/integration' },
  { render: InfoForm, path: '/recipient' }
]
*/

const FormId = 'CommunitySettingsForm'

const SubmitButtonAction = () => (
  <SubmitButton formId={FormId}>
    Salvar alterações
  </SubmitButton>
)

const CommunitySettingsPage = ({ match, community }) => {
  // REMOVE MODULES OF MUTATION FORM VALUES
  const { modules, __typename, ...initialValues } = community

  return (
    <MutationForm
      formId={FormId}
      mutation={updateCommunitiesMutation}
      variables={{ id: community.id }}
      values={{ community: initialValues }}
      refetchQueries={[{ query: allUserCommunitiesQuery, variables: { orderBy: 'UPDATED_AT_DESC' } }]}
      updateQuery={(readQuery, writeQuery, data) => {
        const { communities } = readQuery()
        const { update_communities: { returning } } = data
        writeQuery({
          communities: communities.map((node) => node.id !== community.id ? node : returning[0])
        })
      }}
    >
      <ContentPageComponent actions={SubmitButtonAction}>
        {() => (
          <Route
            exact
            path={match.path}
            component={InfoForm}
          />
        )}
      </ContentPageComponent>
    </MutationForm>
  )
}

CommunitySettingsPage.propTypes = {
  match: PropTypes.object.isRequired,
  community: PropTypes.object.isRequired
}

export default CommunitySettingsPage
