import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

// Global module dependencies
import { Loading } from '../../../scripts/Dashboard/components'
import { GoogleFontsLoader } from '../../../components/Fonts'
import * as arrayUtil from '../../../util/array'

// Current module dependencies
import * as MobilizationSelectors from '../selectors'

// Children modules dependencies
import {
  actions as BlockActions,
  selectors as BlockSelectors
} from '../blocks'
import {
  actions as WidgetActions,
  selectors as WidgetSelectors
} from '../../widgets'

class MobilizationEditContainer extends Component {
  static fetchData (store, params) {
    const promises = []
    if (!BlockSelectors.isLoaded(store.getState())) {
      const action = BlockActions.asyncBlockFetch(params.mobilization_id)
      const promise = store.dispatch(action)
      promises.push(promise)
    }

    if (!WidgetSelectors.isLoaded(store.getState())) {
      const action = WidgetActions.asyncWidgetFetch(params.mobilization_id)
      const promise = store.dispatch(action)
      promises.push(promise)
    }
    return Promise.all(promises)
  }

  componentDidMount () {
    // TODO this callback is a workaround to load data in client-side
    // but it should be replaced by the static fetchData method that is fetching
    // data only in the server-side for now
    const { mobilization, asyncBlockFetch, asyncWidgetFetch } = this.props
    asyncBlockFetch(mobilization.id)
    asyncWidgetFetch(mobilization.id)
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

MobilizationEditContainer.propTypes = {
  blocks: PropTypes.shape({
    loaded: PropTypes.bool.isRequired
  }).isRequired,
  widgets: PropTypes.shape({
    loaded: PropTypes.bool.isRequired
  }).isRequired,
  mobilization: PropTypes.shape({
    id: PropTypes.string.number,
    header_font: PropTypes.string.isRequired,
    body_font: PropTypes.string.isRequired
  }).isRequired
}

const mapStateToProps = (state) => ({
  blocksIsLoaded: state.blocks.loaded,
  blocksIsLoading: state.blocks.loading,
  widgetsIsLoaded: state.widgets.list.loaded,
  widgetsIsLoading: state.widgets.list.loading,
  mobilization: MobilizationSelectors.getCurrent(state)
})

const mapActionCreatorsToProps = {
  asyncBlockFetch: BlockActions.asyncBlockFetch,
  asyncWidgetFetch: WidgetActions.asyncWidgetFetch
}

export default connect(mapStateToProps, mapActionCreatorsToProps)(MobilizationEditContainer)
