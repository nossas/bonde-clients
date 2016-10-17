import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import * as Paths from '../../Paths'
import { Loading } from '../../components'
import { MobilizationList, MobilizationListHeader }  from '../components'
import {
  setCurrentMobilizationId,
  setMobilizationMoreMenuActiveIndex
} from '../MobilizationActions'

export class MobilizationListPage extends Component {
  componentDidMount() {
    const { dispatch } = this.props
    dispatch(setCurrentMobilizationId(null))
    dispatch(setMobilizationMoreMenuActiveIndex(undefined))
  }

  render() {
    const {
      mobilization: { data, loading, loaded },
      mobilizationMoreMenuActiveIndex,
      dispatch
    } = this.props

    return (
      <div className="flex-auto bg-silver gray">
        <MobilizationListHeader
          {...this.props}
          redirectToAdd={() => Paths.newMobilization()}
        />
        {(
          loading && !loaded ? <Loading /> :
          <MobilizationList
            {...this.props}
            redirectToEdit={id => Paths.editMobilization(id)}
            mobilizations={data}
          />
        )}
        {
          typeof mobilizationMoreMenuActiveIndex !== 'undefined' && (
            <div
              className="mobilization-list-more-menu-cancel-overlay z1"
              style={{ position: 'fixed', top: 0, right: 0, bottom: 0, left: 0 }}
              onClick={() => { dispatch(setMobilizationMoreMenuActiveIndex(undefined)) }}
            />
          )
        }
      </div>
    )
  }
}

MobilizationListPage.propTypes = {
  data: PropTypes.array,
  loaded: PropTypes.bool,
  loading: PropTypes.bool,
  dispatch: PropTypes.func
}

const mapStateToProps = state => ({
  mobilizationMoreMenuActiveIndex: state.mobilization.mobilizationMoreMenuActiveIndex
})

export default connect(mapStateToProps)(MobilizationListPage)
