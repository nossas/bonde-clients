import React from 'react'
import { connect } from 'react-redux'
import { Loading } from './../components'
import { fetchMobilizations, isMobilizationsLoaded } from './../reducers/mobilizations'

@connect(state => ({
  mobilizations: state.mobilizations
}))

export default class UserDashboard extends React.Component {
  componentDidMount() {
    // TODO this callback is a workaround to load mobilizations in client-side
    // but it should be replaced by the static fetchData method that is fetching
    // mobilizations only in the server-side for now
    if (!this.props.mobilizations.loaded) {
      this.props.dispatch(fetchMobilizations())
    }
  }

  render() {
    return (this.props.mobilizations.loaded ? this.renderMobilizations() : this.renderLoading())
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
            {
              /* TODO pass mobilizations as props, and change the following
              components to read mobilizations.data as the mobilizations list */
            }
            { React.cloneElement(this.props.main, {...this.props, mobilizations: this.props.mobilizations.data}) }
          </div>
        </div>
      )
    }
  }

  renderMobilizations() {
    const { mobilizations } = this.props
    const ids = mobilizations.data.map((mobilization) => {return mobilization.id.toString()})
    const mobilization = mobilizations.data[ids.indexOf(this.props.params.mobilization_id)]
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
      promises.push(store.dispatch(fetchMobilizations()))
    }
    return Promise.all(promises)
  }
}
