import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { fetchWidgets, isWidgetsLoaded } from '../../../scripts/Widget/reducer'
import { select } from '../action-creators'
import * as MobilizationSelectors from '../selectors'
import { GoogleFontsLoader } from '../../../components/Fonts'
import * as arrayUtil from '../../../util/array'
import {
  actions as BlockActions,
  selectors as BlockSelectors,
} from '../../../modules/mobilizations/blocks'


class MobilizationEditContainer extends React.Component {

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
    select(mobilization.id)
  }

  render() {
    const { children, ...otherProps } = this.props
    const { mobilization: { header_font: headerFont, body_font: bodyFont } } = otherProps
    const fonts = [headerFont, bodyFont].filter(arrayUtil.distinct)

    return (
      <div className='flex flex-auto overflow-hidden'>
        {children && React.cloneElement(children, {...otherProps})}
        <GoogleFontsLoader fonts={fonts} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  blocks: state.blocks,
  widgets: state.widgets,
  mobilization: MobilizationSelectors.getCurrent(state)
})

const mapActionCreatorsToProps = {
  asyncBlockFetch: BlockActions.asyncBlockFetch,
  fetchWidgets,
  select
}

export default connect(mapStateToProps)(MobilizationEditContainer)
