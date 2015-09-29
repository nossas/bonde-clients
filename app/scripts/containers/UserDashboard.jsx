import React from 'react'
import { connect } from 'react-redux'
import { Loading, TopMenu } from './../components'
import { fetchMobilizations, isMobilizationsLoaded } from './../reducers/mobilizations'

@connect(state => ({
  mobilizations: state.mobilizations
}))

export default class UserDashboard extends React.Component {
  static fetchData(store) {
    const promises = []
    if (!isMobilizationsLoaded(store.getState())) {
      promises.push(store.dispatch(fetchMobilizations()))
    }
    return Promise.all(promises)
  }

  componentDidMount() {
    // TODO this callback is a workaround to load mobilizations in client-side
    // but it should be replaced by the static fetchData method that is fetching
    // mobilizations only in the server-side for now
    if (!this.props.mobilizations.loaded) {
      this.props.dispatch(fetchMobilizations())
    }
  }

  selectedMobilization() {
    const { mobilizations, params } = this.props
    return mobilizations.data.filter((m) => {
      return m.id === parseInt(params.mobilization_id, 10)
    })[0]
  }

  renderMobilizations() {
    const { auth, mobilizations } = this.props

    // TODO http://glenmaddern.com/articles/css-modules
    // we should be using css modules to better define styles
    const absoluteStyle = {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      display: 'flex',
      flexDirection: 'column'
    }

    return (
      <div style={absoluteStyle}>
        <TopMenu auth={auth} />
        {
          /* TODO pass mobilizations as props, and change the following
          components to read mobilizations.data as the mobilizations list */
          React.cloneElement(this.props.children, {
            mobilizations: mobilizations.data,
            mobilization: this.selectedMobilization()
          })
        }
      </div>
    )
  }

  render() {
    return (this.props.mobilizations.loaded ? this.renderMobilizations() : <Loading />)
  }
}
