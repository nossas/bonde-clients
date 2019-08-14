import React from 'react'
import PropTypes from 'prop-types'
import { Route } from 'services/auth'
import { FormContentPage } from 'scenes/Dashboard/components'
import InfoForm from './components/InfoForm'

const pages = [
  { render: InfoForm, exact: true },
  { render: InfoForm, path: '/invite' },
  { render: InfoForm, path: '/domain' },
  { render: InfoForm, path: '/integration' },
  { render: InfoForm, path: '/recipient' }
]

const CommunitySettinigsPage = ({ match, community }) => (
  <React.Fragment>
    {pages.map(({ exact, path, ...rest }, i) => (
      <Route
        key={`settings-page-router-${i}`}
        exact={exact}
        path={exact ? match.path : `${match.path}${path}`}
        component={FormContentPage}
        componentProps={{ community, ...rest }}
      />
    ))}
  </React.Fragment>
)

CommunitySettinigsPage.propTypes = {
  match: PropTypes.object.isRequired,
  community: PropTypes.object.isRequired
}

export default CommunitySettinigsPage
