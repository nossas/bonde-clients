import React from 'react'
import { connect } from 'react-redux'
import { Loading, TopMenu } from './../components'
/*import { fetchMobilizations, isMobilizationsLoaded } from './../reducers/mobilizations'*/
import { fetchOrganizations, isOrganizationsLoaded } from './../reducers/organizations'

/*import { fetchMobilizations, mobilizationsIsLoaded } from '../Mobilization/MobilizationActions'*/
/*import { getObjectsStateToProps } from '../Mobilization/MobilizationSelectors'*/

class UserDashboard extends React.Component {

  static fetchData(store) {
    const promises = []

    if (!isOrganizationsLoaded(store.getState())) {
      promises.push(store.dispatch(fetchOrganizations()))
    }

    return Promise.all(promises)
  }

  componentDidMount() {
    // TODO this callback is a workaround to load mobilizations in client-side
    // but it should be replaced by the static fetchData method that is fetching
    // mobilizations only in the server-side for now

    if (!this.props.organizations.loaded) {
      this.props.dispatch(fetchOrganizations())
    }
  }

  render() {
    const { children, auth, ...otherProps } = this.props
    return (
      <div className="top-0 right-0 bottom-0 left-0 flex flex-column absolute">
        <TopMenu auth={auth} />
        {
          React.cloneElement(children, {...otherProps})
        }
      </div>
    )
  }
}

const mapStateToProps = (globalState) => {
  return {
    organizations: globalState.organizations
  }
}

export default connect(mapStateToProps)(UserDashboard)
