import React from 'react'
import * as paths from '../Paths'

export default class RequireLogin extends React.Component {
  static onEnter(store) {
    return (nextState, transition) => {
      const {auth} = store.getState()
      if (!auth.user) {
        transition.to(paths.login())
      }
    }
  }

  render() {
    return React.cloneElement(this.props.children, {auth: this.props.auth})
  }
}
