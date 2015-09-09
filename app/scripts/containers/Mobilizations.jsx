import React from 'react'
import { connect } from 'react-redux'
import { Loading } from './../components'
import { loadMobilizations, isMobilizationsLoaded } from './../reducers/mobilizations'

@connect(state => ({
  mobilizations: state.mobilizations.data
}))

export default class Mobilizations extends React.Component {
  render() {
    return (this.props.mobilizations.length > 0 ? this.renderMobilizations() : this.renderLoading())
  }

  renderTopMenu() {
    return this.props.topMenu && React.cloneElement(this.props.topMenu, {...this.props})
  }

  renderComponents() {
    if (this.props.main) {
      return (
        <div>
          { this.renderTopMenu() }
          <div className="flex flex-stretch">
            { this.props.sidebar && React.cloneElement(this.props.sidebar, {...this.props}) }
            { React.cloneElement(this.props.main, {...this.props}) }
          </div>
        </div>
      )
    }
  }

  renderMobilizations() {
    const ids = this.props.mobilizations.map((mobilization) => {return mobilization.id.toString()})
    const mobilization = this.props.mobilizations[ids.indexOf(this.props.params.mobilization_id)]
    return (
      <div>
        { this.props.children && React.cloneElement(this.props.children, {...this.props, mobilization})}
        { this.renderComponents() }
      </div>
    )
  }

  renderLoading() {
    return (
      <Loading />
    )
  }

  static fetchData(store) {
    const promises = []
    if (!isMobilizationsLoaded(store.getState())) {
      promises.push(store.dispatch(loadMobilizations()))
    }
    return Promise.all(promises)
  }
}
