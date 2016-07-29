import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as Paths from '../../Paths'
import { Loading } from '../../components'

import { MobilizationList, MobilizationListHeader }  from '../components'

import { fetchMobilizations, mobilizationsIsLoaded } from '../MobilizationActions'
import { getObjectsStateToProps } from '../MobilizationSelectors'


class MobilizationListPage extends Component {

  // Esse comportamente é especifico desta aplicação
  // TODO: Migrar para o boilerplate Mern
  static fetchData({ dispatch, getState }) {
    const promises = []
    if (!mobilizationsIsLoaded(getState())) {
      promises.push(dispatch(fetchMobilizations()))
    }

    return Promise.all(promises)
  }

  componentDidMount() {
    const { loaded, dispatch } = this.props
    if (!loaded) {
      // TODO: Entender padrão dessa chamada
      dispatch(fetchMobilizations())
    }
  }

  render() {
    const { data, loading, loaded } = this.props
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
  data: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
}

// Mapped only state for work list of mobilizations
export default connect(globalState => getObjectsStateToProps(globalState))(MobilizationListPage)
