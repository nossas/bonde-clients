import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchWidgets, isWidgetsLoaded } from '../../../scripts/Widget/reducer'
import * as MobilizationSelectors from '../selectors'
import { GoogleFontsLoader } from '../../../components/Fonts'
import * as arrayUtil from '../../../util/array'
import { actions as BlockActions, selectors as BlockSelectors } from '../blocks'

import { Loading } from '../../../scripts/Dashboard/components'


class MobilizationEditContainer extends React.Component {

  static fetchData(store, params) {
    const promises = []
    if (!BlockSelectors.isLoaded(store.getState())) {
      const action = BlockActions.asyncBlockFetch(params.mobilization_id)
      const promise = store.dispatch(action)
      promises.push(promise)
    }
    if (!isWidgetsLoaded(store.getState())) {
      const action = fetchWidgets({ mobilization_id: params.mobilization_id })
      const promise = store.dispatch(action)
      promises.push(promise)
    }
    return Promise.all(promises)
  }

  componentDidMount() {
    // TODO this callback is a workaround to load data in client-side
    // but it should be replaced by the static fetchData method that is fetching
    // data only in the server-side for now
    const { mobilization, asyncBlockFetch, fetchWidgets, select } = this.props
    asyncBlockFetch(mobilization.id)
    fetchWidgets({ mobilization_id: mobilization.id })
  }

  render() {
    const {
      children,
      blocksIsLoaded,
      blocksIsLoading,
      widgetsIsLoaded,
      widgetsIsLoading,
      mobilization
    } = this.props

    if (blocksIsLoaded && widgetsIsLoaded && !blocksIsLoading && !widgetsIsLoading) {
      const { header_font, body_font } = mobilization
      const fonts = [header_font, body_font].filter(arrayUtil.distinct)

      // TODO: Remove inline style
      return (
        <div className='flex flex-auto overflow-hidden'>
          {children}
          <GoogleFontsLoader fonts={fonts} />
        </div>
      )
    }

    return <Loading />
  }
}

const mapStateToProps = (state) => ({
  blocksIsLoaded: state.blocks.loaded,
  blocksIsLoading: state.blocks.loading,
  widgetsIsLoaded: state.widgets.loaded,
  widgetsIsLoading: state.widgets.loading,
  mobilization: MobilizationSelectors.getCurrent(state)
})

const mapActionCreatorsToProps = {
  asyncBlockFetch: BlockActions.asyncBlockFetch,
  fetchWidgets
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(MobilizationEditContainer)
