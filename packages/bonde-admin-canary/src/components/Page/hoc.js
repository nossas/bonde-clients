import React from 'react'
import { store } from '../../services/redux'
import * as actionTypes from './redux/actionTypes'

const hoc = ({ pageTitle, actions }) => Component => class extends React.Component {
  
  componentDidMount () {
    pageTitle && store.dispatch({
      type: actionTypes.CHANGE_TITLE,
      payload: typeof pageTitle === 'function' ? pageTitle(this.props) : pageTitle
    })

    actions ? store.dispatch({
      type: actionTypes.ADD_ACTIONS,
      payload: typeof actions === 'function' ? actions(this.props) : actions
    }) : store.dispatch({ type: actionTypes.RESET_ACTIONS })
  }

  render () {
    return <Component {...this.props} />
  }
}

export default hoc
