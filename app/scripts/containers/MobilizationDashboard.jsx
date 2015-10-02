import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchBlocks, isBlocksLoaded } from './../reducers/blocks'
import { fetchWidgets, isWidgetsLoaded } from './../reducers/widgets'
import { MobilizationMenu } from './../components'

@connect(state => ({
  auth: state.auth,
  blocks: state.blocks,
  widgets: state.widgets
}))

export default class MobilizationDashboard extends React.Component {
  static propTypes = {
    blocks: PropTypes.object.isRequired,
    widgets: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    mobilization: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    children: PropTypes.object
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
    const {dispatch, mobilization} = this.props
    dispatch(fetchBlocks({mobilization_id: mobilization.id}))
    dispatch(fetchWidgets({mobilization_id: mobilization.id}))
  }

  render() {
    // TODO http://glenmaddern.com/articles/css-modules
    // we should be using css modules to better define styles
    const sidebarStyle = {overflowY: 'scroll', maxWidth: '300px'}
    const contentStyle = {overflowY: 'scroll', flex: 1, display: 'flex'}
    const flexStyle = {
      flex: 1,
      display: 'flex',
      overflowY: 'scroll'
    }

    return (
      <div style={flexStyle}>
        <section style={sidebarStyle} className='bg-gray p2 white'>
          <MobilizationMenu {...this.props} />
        </section>
        <section style={contentStyle}>
          {React.cloneElement(this.props.children, {...this.props})}
        </section>
      </div>
    )
  }
}
