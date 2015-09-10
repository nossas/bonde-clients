import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchBlocks, isBlocksLoaded } from './../reducers/blocks'

@connect(state => ({
  auth: state.auth,
  blocks: state.blocks
}))

export default class Mobilization extends React.Component {
  static propTypes = {
    main: PropTypes.object.isRequired,
    topMenu: PropTypes.object,
    sidebar: PropTypes.object
  }

  static fetchData(store, params) {
    const promises = []
    if (!isBlocksLoaded(store.getState())) {
      const action = fetchBlocks({mobilization_id: params.mobilization_id})
      const promise = store.dispatch(action)
      promises.push(promise)
    }
    return Promise.all(promises)
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
