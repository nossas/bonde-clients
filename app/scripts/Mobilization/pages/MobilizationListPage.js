import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as Paths from '../../Paths'
import { Loading } from '../../components'
import { MobilizationList, MobilizationListHeader }  from '../components'
import { setCurrentMobilizationId } from '../MobilizationActions'

class MobilizationListPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(setCurrentMobilizationId(null))
  }

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

// UserDashboardContainer
MobilizationListPage.propTypes = {
  data: PropTypes.array,
  loaded: PropTypes.bool,
  loading: PropTypes.bool,
  dispatch: PropTypes.func.isRequired
}

export default MobilizationListPage
