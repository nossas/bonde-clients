import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as Paths from '../../Paths'
import { Loading } from '../../components'
import { MobilizationList, MobilizationListHeader }  from '../components'
import { fetchMobilizations, mobilizationsIsLoaded } from '../MobilizationActions'

class MobilizationListPage extends Component {

  render() {
    const { mobilization: { data, loading, loaded } } = this.props
    return (
      <div className="flex-auto bg-silver gray">
        <MobilizationListHeader redirectToAdd={() => Paths.newMobilization()} />
        {(!loading && loaded ?
          <MobilizationList
            redirectToEdit={id => Paths.editMobilization(id)}
            mobilizations={data} /> :
          <Loading />
        )}
      </div>
    )
  }
}

MobilizationListPage.propTypes = {
  mobilization: PropTypes.shape({
    data: PropTypes.array.isRequired,
    loaded: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired
  }).isRequired,  // UserDashboardContainer
}

export default MobilizationListPage
