import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchMobilizations, mobilizationsIsLoaded } from '../MobilizationActions'
// TODO: Refactor actions to module
import { fetchOrganizations, isOrganizationsLoaded } from '../../reducers/organizations'
import { Sidenav } from '../../../components/Navigation'

class UserDashboard extends Component {

  static fetchData({ dispatch, getState }) {
    const promises = []

    // TODO: When filter mobilization by user owner, make code here
    if (!mobilizationsIsLoaded(getState())) {
      promises.push(dispatch(fetchMobilizations()))
    }

    if (!isOrganizationsLoaded(getState())) {
      promises.push(dispatch(fetchOrganizations()))
    }

    return Promise.all(promises)
  }

  componentDidMount() {
    // TODO this callback is a workaround to load mobilizations in client-side
    // but it should be replaced by the static fetchData method that is fetching
    // mobilizations only in the server-side for now
    const { organizations, mobilization, dispatch } = this.props

    if (!organizations.loaded) {
      dispatch(fetchOrganizations())
    }

    if (!mobilization.loaded) {
      dispatch(fetchMobilizations())
    }
  }

  render() {
    const { children, ...otherProps } = this.props

    return (
      <div className="top-0 right-0 bottom-0 left-0 flex flex-column absolute">
        <Sidenav user={otherProps.auth.user} />
        {
          React.cloneElement(children, {...otherProps})
        }
      </div>
    )
  }
}

UserDashboard.propTypes = {
  auth: PropTypes.object.isRequired,  // RequireLogin.js
  organizations: PropTypes.object.isRequired,
  mobilization: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  children: PropTypes.element
}

const mapStateToProps = (globalState, ownProps) => {
  return {
    organizations: globalState.organizations,
    mobilization: globalState.mobilization
  }
}

export default connect(mapStateToProps)(UserDashboard)
