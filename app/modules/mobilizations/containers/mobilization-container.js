import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchWidgets, isWidgetsLoaded } from '../../../scripts/Widget/reducer'
import * as MobilizationSelectors from '../selectors'
import { GoogleFontsLoader } from '../../../components/Fonts'
import { Loading } from '../../../scripts/Dashboard/components'
import * as arrayUtil from '../../../util/array'
import {
  actions as BlockActions,
  selectors as BlockSelectors,
} from '../blocks'


class MobilizationContainer extends React.Component {

  static fetchData(store, params) {
    const promises = []
    if (!BlockSelectors.isLoaded(store.getState())) {
      const action = BlockActions.asyncBlockFetch(params.mobilization_id)
      const promise = store.dispatch(action)
      promises.push(promise)
    }
    if (!isWidgetsLoaded(store.getState())) {
      const action = fetchWidgets({mobilization_id: params.mobilization_id})
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
    fetchWidgets({mobilization_id: mobilization.id})
  }

  render() {
    const { children, blockIsLoaded, widgetIsLoaded, mobilization } = this.props
    const { header_font, body_font } = mobilization
    const fonts = [header_font, body_font].filter(arrayUtil.distinct)

    // TODO: Make tests to render container if blocks and widgets loaded
    if (blockIsLoaded && widgetIsLoaded) {
      // TODO: Make tests to check if mobilization is passed
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
  mobilization: MobilizationSelectors.getCurrent(state),
  widgetIsLoaded: isWidgetsLoaded(state),
  blockIsLoaded: BlockSelectors.isLoaded(state)
})

const mapActionCreatorsToProps = {
  asyncBlockFetch: BlockActions.asyncBlockFetch,
  fetchWidgets
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(MobilizationContainer)
