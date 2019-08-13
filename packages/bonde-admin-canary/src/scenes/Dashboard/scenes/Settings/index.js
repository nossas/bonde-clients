import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'services/auth'
import { ContentPage } from 'scenes/Dashboard/components'
import InfoForm from './components/InfoForm'

const pages = [
  { form: InfoForm, exact: true },
  { form: InfoForm, path: '/invite' },
  { form: InfoForm, path: '/domain' },
  { form: InfoForm, path: '/integration' },
  { form: InfoForm, path: '/recipient' }
]

const CommunitySettinigsPage = ({ match, community }) => (
  <React.Fragment>
    {pages.map(({ exact, form, path }, i) => (
      <Route
        key={`settings-page-router-${i}`}
        exact={exact}
        path={exact ? match.path : `${match.path}${path}`}
        component={ContentPage}
        componentProps={{ community, render: InfoForm }}
      />
    ))}
  </React.Fragment>
)

CommunitySettinigsPage.propTypes = {
  match: PropTypes.object.isRequired,
  community: PropTypes.object.isRequired
}

export default CommunitySettinigsPage
