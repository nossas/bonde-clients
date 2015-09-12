import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchBlocks, isBlocksLoaded } from './../reducers/blocks'
import { fetchWidgets, isWidgetsLoaded } from './../reducers/widgets'

@connect(state => ({
  auth: state.auth,
  blocks: state.blocks,
  widgets: state.widgets
}))

export default class Mobilization extends React.Component {
  static propTypes = {
    blocks: PropTypes.object.isRequired,
    widgets: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    main: PropTypes.object.isRequired,
    topMenu: PropTypes.object,
    sidebar: PropTypes.object,
    mobilization: PropTypes.object.isRequired
  }

  static fetchData(store, params) {
    const promises = []
    if (!isBlocksLoaded(store.getState())) {
      const action = fetchBlocks({mobilization_id: params.mobilization_id})
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
    const {blocks, dispatch, mobilization, widgets} = this.props

    if (!blocks.loaded) {
      dispatch(fetchBlocks({mobilization_id: mobilization.id}))
    }
    if (!widgets.loaded) {
      dispatch(fetchWidgets({mobilization_id: mobilization.id}))
    }
  }

  render() {
    return (
      <div>
        { this.props.topMenu && React.cloneElement(this.props.topMenu, {...this.props}) }
        <div className="flex flex-stretch">
          { this.props.sidebar && React.cloneElement(this.props.sidebar, {...this.props}) }
          { React.cloneElement(this.props.main, {...this.props}) }
        </div>
      </div>
    )
  }
}
