import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as Paths from '../../Paths'
import { Loading } from '../../components'
import { MobilizationList, MobilizationListHeader }  from '../components'
import { fetchMobilizations, mobilizationsIsLoaded } from '../MobilizationActions'

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
    const { mobilizations, loading, loaded } = this.props
    return (
      <div className="flex-auto bg-silver gray">
        <MobilizationListHeader redirectToAdd={() => Paths.newMobilization()} />
        {(!loading && loaded ?
          <MobilizationList
            redirectToEdit={id => Paths.editMobilization(id)}
            mobilizations={mobilizations} /> :
          <Loading />
        )}
      </div>
    )
  }
}

MobilizationListPage.propTypes = {
  mobilizations: PropTypes.array.isRequired,
  loaded: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired
}

export const mapStateToProps = (globalState) => {
  return {
    mobilizations: globalState.mobilizations.data,
    loaded: globalState.mobilizations.loaded,
    loading: globalState.mobilizations.loading
  }
}

export default connect(mapStateToProps)(MobilizationListPage)
