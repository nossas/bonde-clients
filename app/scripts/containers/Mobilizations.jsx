import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { Loading } from './../components'
import * as MobilizationActions from './../actions/MobilizationActions'

@connect(state => ({
  mobilizations: state.mobilizations
}))

export default class Mobilizations extends React.Component {
  componentDidMount(){
    const { dispatch } = this.props
    const actions = bindActionCreators(MobilizationActions, dispatch)
    actions.fetchMobilizations()
  }

  render(){
    return(this.props.mobilizations.length > 0 ? this.renderMobilizations() : this.renderLoading())
  }

  renderComponents() {
    if(this.props.main) {
      return (
        <div className="flex flex-stretch">
          { this.props.sidebar && React.cloneElement(this.props.sidebar, {...this.props}) }
          { React.cloneElement(this.props.main, {...this.props}) }
        </div>
      )
    }
  }

  renderMobilizations() {
    const ids = this.props.mobilizations.map((mobilization) => {return mobilization.id.toString()})
    const mobilization = this.props.mobilizations[ids.indexOf(this.props.params.mobilization_id)]
    return(
      <div>
        { this.props.children && React.cloneElement(this.props.children, {...this.props, mobilization})}
        { this.renderComponents() }
      </div>
    )
  }

  renderLoading(){
    return(
      <Loading />
    )
  }
}
